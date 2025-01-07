/**
 * Removes unsafe attributes from an HTML element, leaving only the allowed attributes.
 *
 * @param {HTMLElement} element - The HTML element from which to strip unsafe attributes.
 * @param {Object} [options] - Optional settings.
 * @param {string[]} [options.extraAllowedAttributes] - Additional attributes to allow.
 * @returns {HTMLElement} The sanitized HTML element.
 */
export default function stripUnsafeAttributes(element, options = { extraAllowedAttributes: [] }) {
    const allowedAttributes = [
      "href",
      "src",
      "width", 
      "height", 
      "alt", 
      "cite", 
      "datetime", 
      "title", 
      "class",
      "name",
      "xml:lang",
      "abbr",
      "target",
      "border",
      ...options.extraAllowedAttributes
    ]
  
    let attributesToRemove = [];
  
    for (let attribute of element.attributes) {
      if (!allowedAttributes.includes(attribute.name)) {
        attributesToRemove.push(attribute.name);
      }
    }
  
    for (let attribute of attributesToRemove) {
      element.removeAttribute(attribute);
    }
  
    return element;
  }