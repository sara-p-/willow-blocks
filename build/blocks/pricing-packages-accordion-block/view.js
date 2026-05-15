import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "./src/utils/decode-html-entities.js"
/*!*******************************************!*\
  !*** ./src/utils/decode-html-entities.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeHtmlEntities: () => (/* binding */ decodeHtmlEntities)
/* harmony export */ });
/**
 * Decode HTML entities for plain-text display (e.g. data-wp-text / textContent).
 * Loops until stable to handle values like "&amp;#038;" from double encoding.
 */
function decodeHtmlEntities(text) {
  if (!text || typeof text !== "string") {
    return "";
  }
  let decoded = text;
  let previous = "";
  while (decoded !== previous) {
    previous = decoded;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = decoded;
    decoded = textarea.value;
  }
  return decoded;
}

/***/ },

/***/ "@wordpress/interactivity"
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************************************************!*\
  !*** ./src/blocks/pricing-packages-accordion-block/view.js ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/* harmony import */ var _utils_decode_html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/decode-html-entities */ "./src/utils/decode-html-entities.js");


const isFeaturedMeta = value => value === true || value === 1 || value === "1";
(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("willow-blocks/pricing-packages-accordion-block", {
  state: {
    get currentListRows() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const items = context.item?.meta?._pp_list ?? [];
      const flags = context.item?.meta?._pp_list_plus ?? [];
      return items.map((text, i) => ({
        text: (0,_utils_decode_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeHtmlEntities)(text ?? ""),
        isPlus: Boolean(flags[i])
      }));
    }
  },
  selectors: {
    packageTitle: () => (0,_utils_decode_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeHtmlEntities)((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().item?.title?.rendered ?? ""),
    packageDescription: () => (0,_utils_decode_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeHtmlEntities)((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().item?.meta?._pp_description ?? ""),
    packagePrice: () => (0,_utils_decode_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeHtmlEntities)((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().item?.meta?._pp_price ?? ""),
    accordionTriggerText: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.isOpen ? "Collapse" : "Expand";
    },
    isItemFeatured: () => isFeaturedMeta((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().item?.meta?._pp_featured)
  },
  actions: {
    toggleAccordion() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.isOpen = !context.isOpen;
    },
    *fetchPosts() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        apiUrl,
        nonce
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getConfig)();
      context.loading = true;
      const params = new URLSearchParams({
        per_page: 12,
        orderby: "menu_order",
        order: "asc",
        _fields: "id,title,meta"
      });
      const res = yield fetch(`${apiUrl}?${params}`, {
        headers: {
          "X-WP-Nonce": nonce
        }
      });
      const data = yield res.json();
      context.posts = data.map(post => ({
        ...post,
        meta: {
          ...post.meta,
          _pp_featured: isFeaturedMeta(post.meta?._pp_featured)
        }
      }));
      context.loading = false;
    }
  },
  callbacks: {
    onInit() {
      const {
        actions
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("willow-blocks/pricing-packages-accordion-block");
      actions.fetchPosts();
    }
  }
});
})();


//# sourceMappingURL=view.js.map