import {
	store,
	getContext,
	getElement,
	getConfig,
} from "@wordpress/interactivity";

const decodeHtmlEntities = (str) => {
	const txt = document.createElement("textarea");
	txt.innerHTML = str;
	return txt.value;
};

const { state, actions, callbacks } = store(
	"willow-blocks/pricing-packages-slider-block",
	{
		state: {
			currentIndex: 0,
			slidesPerView: 3,
		},

		selectors: {
			/** Display title: falls back to rendered title string */
			packageTitle() {
				const ctx = getContext();
				return ctx?.item?.meta?._pp_title || ctx?.item?.title?.rendered || "";
			},

			packageDescription() {
				const ctx = getContext();
				return ctx?.item?.meta?._pp_description || "";
			},

			packagePrice() {
				const ctx = getContext();
				return ctx?.item?.meta?._pp_price || "";
			},

			/** Adds the is-featured class when the post meta flag is truthy */
			isItemFeatured() {
				const ctx = getContext();
				return !!ctx?.item?.meta?._pp_featured;
			},
		},

		actions: {
			prev() {
				const ctx = getContext();
				const total = ctx.posts.length;
				if (state.currentIndex === 0) return;

				state.currentIndex -= 1;
				actions._updateTrack(ctx);
			},

			next() {
				const ctx = getContext();
				const total = ctx.posts.length;
				if (state.currentIndex >= total - state.slidesPerView) return;

				state.currentIndex += 1;
				actions._updateTrack(ctx);
			},

			/**
			 * Moves the slider track. Called exclusively from data-wp-on--click
			 * handlers so getElement() is always in scope.
			 */
			_updateTrack(ctx) {
				const { ref } = getElement();
				const root = ref.closest(
					'[data-wp-interactive="willow-blocks/pricing-packages-slider-block"]',
				);
				if (!root) return;

				const track = root.querySelector(".slider-track");
				if (!track) return;

				const total = ctx.posts.length;
				// Each slide is (100 / total)% of the track width regardless
				// of how many are visible, so offset by one slide per index step.
				const slideWidthPercent = 100 / total;
				const offset = state.currentIndex * slideWidthPercent;
				track.style.transform = `translateX(-${offset}%)`;
			},
		},

		callbacks: {
			async onInit() {
				const ctx = getContext();
				const { ref } = getElement();
				const config = getConfig();

				// ── Fetch posts ──────────────────────────────────────────
				try {
					const url = new URL(config.apiUrl);
					url.searchParams.set("orderby", "menu_order");
					url.searchParams.set("order", "asc");

					const response = await fetch(url.toString(), {
						headers: {
							"X-WP-Nonce": config.nonce,
						},
					});

					if (!response.ok) {
						throw new Error(`REST API error: ${response.status}`);
					}

					const posts = await response.json();
					ctx.posts = posts.map((post) => {
						const items = post.meta?._pp_list ?? [];
						const flags = post.meta?._pp_list_plus ?? [];
						return {
							...post,
							listRows: items.map((text, i) => ({
								text: decodeHtmlEntities(text ?? ""),
								isPlus: Boolean(flags[i]),
							})),
						};
					});
					ref.style.setProperty("--total-slides", posts.length);
					ref.style.setProperty("--slides-per-view", state.slidesPerView);
				} catch (err) {
					console.error("[pricing-packages-slider] Failed to load posts:", err);
				} finally {
					ctx.loading = false;
				}

				// ── Responsive: 3 slides → 2 → 1 ────────────────────────
				const mqMobile = window.matchMedia("(max-width: 600px)");
				const mqTablet = window.matchMedia("(max-width: 1024px)");

				const onBreakpoint = () => {
					if (mqMobile.matches) {
						state.slidesPerView = 1;
					} else if (mqTablet.matches) {
						state.slidesPerView = 2;
					} else {
						state.slidesPerView = 3;
					}

					ref.style.setProperty("--slides-per-view", state.slidesPerView);

					// Reset position on breakpoint change.
					state.currentIndex = 0;
					const track = ref.querySelector(".slider-track");
					if (track) track.style.transform = "translateX(0%)";
				};

				mqMobile.addEventListener("change", onBreakpoint);
				mqTablet.addEventListener("change", onBreakpoint);
				onBreakpoint(); // run once on init
			},
		},
	},
);
