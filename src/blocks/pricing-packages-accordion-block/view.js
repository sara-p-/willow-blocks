import { store, getContext, getConfig } from "@wordpress/interactivity";
import { decodeHtmlEntities } from "../../utils/decode-html-entities";

const isFeaturedMeta = (value) =>
	value === true || value === 1 || value === "1";

store("willow-blocks/pricing-packages-accordion-block", {
	state: {
		get currentListRows() {
			const context = getContext();
			const items = context.item?.meta?._pp_list ?? [];
			const flags = context.item?.meta?._pp_list_plus ?? [];
			return items.map((text, i) => ({
				text: decodeHtmlEntities(text ?? ""),
				isPlus: Boolean(flags[i]),
			}));
		},
	},
	selectors: {
		packageTitle: () =>
			decodeHtmlEntities(getContext().item?.title?.rendered ?? ""),
		packageDescription: () =>
			decodeHtmlEntities(getContext().item?.meta?._pp_description ?? ""),
		packagePrice: () =>
			decodeHtmlEntities(getContext().item?.meta?._pp_price ?? ""),
		accordionTriggerText: () => {
			const context = getContext();
			return context.isOpen ? "Collapse" : "Expand";
		},
		isItemFeatured: () => isFeaturedMeta(getContext().item?.meta?._pp_featured),
	},
	actions: {
		toggleAccordion() {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
		*fetchPosts() {
			const context = getContext();
			const { apiUrl, nonce } = getConfig();

			context.loading = true;

			const params = new URLSearchParams({
				per_page: 12,
				orderby: "menu_order",
				order: "asc",
				_fields: "id,title,meta",
			});

			const res = yield fetch(`${apiUrl}?${params}`, {
				headers: { "X-WP-Nonce": nonce },
			});

			const data = yield res.json();

			context.posts = data.map((post) => ({
				...post,
				meta: {
					...post.meta,
					_pp_featured: isFeaturedMeta(post.meta?._pp_featured),
				},
			}));
			context.loading = false;
		},
	},
	callbacks: {
		onInit() {
			const { actions } = store(
				"willow-blocks/pricing-packages-accordion-block",
			);
			actions.fetchPosts();
		},
	},
});
