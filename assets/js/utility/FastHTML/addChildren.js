import parseStringToHTMLElements from "./parseStringToHTMLElements.js";

/**
 * @param {HTMLElement} element
 * @param {(HTMLElement|string|DocumentFragment)[]|string|HTMLElement|DocumentFragment} childrenIn
 * @returns {HTMLElement}
 */
export default function addChildren(element, childrenIn) {
  let children = childrenIn;
  if (!(children instanceof Array)) children = [children];
  children.forEach((childIn) => {
    let child = childIn;

    if (typeof child === "string") {
      child = parseStringToHTMLElements(child, { strict: true });
      addChildren(element, child);
      return element;
    }

    if (child instanceof Array) {
      addChildren(element, child)
      return element;
    };

    if (element.shadowRoot) element.shadowRoot.append(child);
    else element.append(child);
  });

  return element;
}