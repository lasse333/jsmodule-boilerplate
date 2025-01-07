import applyStyle from "./applyStyle.js";

/**
 * Changes the style of the specified parent element(s).
 *
 * @param {(string|Element)} parentElement - The parent element(s) to change the style of. Can be a CSS selector string or a DOM element.
 * @param {Object} style - An object containing the style properties and values to apply.
 */
export default function changeStyle(parentElement, style) {
  if (typeof parentElement === "string") {
    document.querySelectorAll(parentElement).forEach((element) => {
      applyStyle(element, style);
    });
  } else {
    applyStyle(parentElement, style);
    return parentElement;
  }
}