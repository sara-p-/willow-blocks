/**
 * Decode HTML entities for plain-text display (e.g. data-wp-text / textContent).
 * Loops until stable to handle values like "&amp;#038;" from double encoding.
 */
export function decodeHtmlEntities(text) {
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
