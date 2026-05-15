import { useEffect, useRef, useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";

const decodeHtmlEntities = (str) => {
	const txt = document.createElement("textarea");
	txt.innerHTML = str;
	return txt.value;
};

export default function Edit() {
	const blockProps = useBlockProps();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(3);
	const trackRef = useRef(null);
	const rootRef = useRef(null);

	// ── Fetch posts ──────────────────────────────────────────────────────────
	useEffect(() => {
		apiFetch({
			path: "/wp/v2/pricing-package?orderby=menu_order&order=asc&per_page=100",
		})
			.then((data) => {
				const mapped = data.map((post) => {
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
				setPosts(mapped);
			})
			.catch((err) => {
				console.error("[pricing-packages-slider] Editor fetch error:", err);
			})
			.finally(() => setLoading(false));
	}, []);

	// ── Set CSS custom properties when posts or slidesPerView change ─────────
	useEffect(() => {
		if (!rootRef.current || posts.length === 0) return;
		rootRef.current.style.setProperty("--total-slides", posts.length);
		rootRef.current.style.setProperty("--slides-per-view", slidesPerView);
	}, [posts, slidesPerView]);

	// ── Responsive breakpoints ───────────────────────────────────────────────
	useEffect(() => {
		const mqMobile = window.matchMedia("(max-width: 600px)");
		const mqTablet = window.matchMedia("(max-width: 1024px)");

		const onBreakpoint = () => {
			if (mqMobile.matches) {
				setSlidesPerView(1);
			} else if (mqTablet.matches) {
				setSlidesPerView(2);
			} else {
				setSlidesPerView(3);
			}
			setCurrentIndex(0);
		};

		mqMobile.addEventListener("change", onBreakpoint);
		mqTablet.addEventListener("change", onBreakpoint);
		onBreakpoint();

		return () => {
			mqMobile.removeEventListener("change", onBreakpoint);
			mqTablet.removeEventListener("change", onBreakpoint);
		};
	}, []);

	// ── Update track transform when index changes ────────────────────────────
	useEffect(() => {
		if (!trackRef.current || posts.length === 0) return;
		const slideWidthPercent = 100 / posts.length;
		const offset = currentIndex * slideWidthPercent;
		trackRef.current.style.transform = `translateX(-${offset}%)`;
	}, [currentIndex, posts]);

	const prev = () => {
		setCurrentIndex((i) => Math.max(0, i - 1));
	};

	const next = () => {
		setCurrentIndex((i) => Math.min(posts.length - slidesPerView, i + 1));
	};

	return (
		<div {...blockProps} ref={rootRef}>
			{loading && <p>Loading...</p>}

			{!loading && (
				<div className="slider">
					<div className="slider-wrapper">
						<div className="slider-track" ref={trackRef}>
							{posts.map((post) => (
								<div
									key={post.id}
									className={[
										"slide",
										post.meta?._pp_featured ? "is-featured" : "",
									]
										.filter(Boolean)
										.join(" ")}
								>
									<div className="fake-button-container top-fake-button">
										<p className="fake-button">Most Popular</p>
									</div>

									<h4 className="title">
										{post.meta?._pp_title || post.title?.rendered}
									</h4>
									<p className="description">{post.meta?._pp_description}</p>
									<p className="price">
										<span className="starting-at-text">starting at</span>{" "}
										<span className="currency">$</span>
										<span className="price-value">{post.meta?._pp_price}</span>
									</p>

									<p className="includes-text">This package includes:</p>
									<ul className="list">
										{post.listRows.map((row, i) => (
											<li
												key={i}
												className={["list-item", row.isPlus ? "is-plus" : ""]
													.filter(Boolean)
													.join(" ")}
											>
												{row.text}
											</li>
										))}
									</ul>

									<div className="fake-button-container">
										<a className="fake-button">Select Package</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{!loading && (
				<div className="slider-nav">
					<button
						className="slider-nav-button prev"
						onClick={prev}
						disabled={currentIndex === 0}
					>
						<span className="icon">
							<img
								src={`${wpApiSettings.root}../wp-content/plugins/willow-blocks/assets/images/arrow-left.png`}
								alt="Previous"
							/>
						</span>
					</button>
					<button
						className="slider-nav-button next"
						onClick={next}
						disabled={currentIndex >= posts.length - slidesPerView}
					>
						<span className="icon">
							<img
								src={`${wpApiSettings.root}../wp-content/plugins/willow-blocks/assets/images/arrow-right.png`}
								alt="Next"
							/>
						</span>
					</button>
				</div>
			)}
		</div>
	);
}
