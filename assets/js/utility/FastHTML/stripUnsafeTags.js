/**
 * Removes unsafe HTML tags from the given element.
 *
 * @param {HTMLElement} element - The HTML element to be sanitized.
 * @param {Object} [options] - Optional settings.
 * @param {string[]} [options.extraAllowedTags=[]] - Additional tags to allow.
 * @returns {HTMLElement} The sanitized HTML element.
 */
export default function stripUnsafeTags(element, options = { extraAllowedTags: [] }) {
  const allowedTags = [
    "strong",
    "em",
    "b",
    "i",
    "p",
    "code",
    "pre",
    "tt",
    "samp",
    "kbd",
    "var",
    "sub",
    "sup",
    "dfn",
    "cite",
    "big",
    "small",
    "address",
    "hr",
    "br",
    "id",
    "div",
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "dl",
    "dt",
    "dd",
    "abbr",
    "acronym",
    "a",
    "img",
    "blockquote",
    "del",
    "ins",
    "u",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "colgroup",
    ...options.extraAllowedTags
  ]

  if (!allowedTags.includes(element.tagName.toLowerCase())) {
    element.remove()
  };
  return element;
}