import clearChildren from './clearChildren.js';
import addChildren from './addChildren.js';

/**
 * Replaces the children of a given element with new children.
 *
 * @param {HTMLElement} element - The parent element whose children will be replaced.
 * @param {HTMLElement[]} children - An array of new child elements to be added to the parent element.
 */
export default function replaceChildren(element, children) {
  clearChildren(element);
  addChildren(element, children);
}