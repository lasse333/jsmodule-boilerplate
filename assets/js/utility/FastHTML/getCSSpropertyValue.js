/**
 * Retrieves the computed value of a specified CSS property for a given element.
 *
 * @param {HTMLElement} element - The HTML element from which to get the CSS property value.
 * @param {string} property - The name of the CSS property to retrieve.
 * @returns {CSSStyleValue|string} - The computed value of the specified CSS property, or the property name if the value is not found.
 */
export default function getCSSpropertyValue(element, property) {
    let out = element.computedStyleMap().get(property);
  
    if (!out) {
      return property;
    }
  
    return out;
  }