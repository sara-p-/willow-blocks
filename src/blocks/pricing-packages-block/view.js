import { store, getContext, getConfig } from "@wordpress/interactivity";

store("willow-blocks/pricing-packages-block", {
	state: {
		get currentItems() {
			const context = getContext();
			return context.item?.meta?._pp_list ?? [];
		},
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
				orderby: "date",
				order: "desc",
				_fields: "id,title,meta",
			});

			const res = yield fetch(`${apiUrl}?${params}`, {
				headers: { "X-WP-Nonce": nonce },
			});

			const data = yield res.json();

			context.posts = data;
			context.loading = false;
			console.log(data);
		},
	},
	callbacks: {
		onInit() {
			const { actions } = store("willow-blocks/pricing-packages-block");
			actions.fetchPosts();
		},
	},
});
