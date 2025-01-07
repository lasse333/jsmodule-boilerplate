import changeStyle from "./changeStyle.js";
import addChildren from "./addChildren.js";

/**
 * Creates a new HTML element with the specified type, attributes, and children.
 *
 * @param {string} type - The type of the HTML element to create (e.g., 'div', 'span', 'a').
 * @param {Object} [attributesIn={}] - An object containing the attributes to set on the element.
 * @param {Object} [attributesIn.class] - The class name(s) to set on the element.
 * @param {Object} [attributesIn.for] - The 'for' attribute to set on the element.
 * @param {Object} [attributesIn.style] - The style object to set on the element.
 * @param {Array} [childrenIn=[]] - An array of child elements or text nodes to append to the created element.
 * @returns {HTMLElement} The created HTML element.
 */
export default function createElement(type, attributesIn, childrenIn) {
  let attributes = attributesIn ?? {};
  let children = childrenIn ?? [];

  let element = document.createElement(type);
  if (["a", "button"].includes(type)) {
    element.addEventListener("click", function (e) {
      changeStyle(this, { cursor: "progress" });
      setTimeout(function () {
        changeStyle(element, { cursor: "" });
      }, 1000);
    });
  }
  Object.assign(element, attributes);
  if (attributes.class) element.className = attributes.class;
  if (attributes.for) element.setAttribute("for", attributes.for);

  if (attributes.style) changeStyle(element, attributes.style);

  addChildren(element, children);

  return element;
}