/**
 * Applies the given style to the specified element. If the style is an instance of CSSStyleSheet,
 * it will be adopted by the element's shadow root. If the element does not have a shadow root,
 * one will be created. Additionally, the style will be updated whenever the "documentstylesheetsupdated"
 * event is triggered.
 *
 * @param {HTMLElement} element - The element to which the style will be applied.
 * @param {CSSStyleSheet|Object} style - The style to apply. Can be an instance of CSSStyleSheet or a plain object.
 */
export default function applyStyle(element, style) {
    if (!(style instanceof CSSStyleSheet)) {
      Object.assign(element.style, style);
      return;
    }
    if (!element.shadowRoot) element.attachShadow({ mode: "open" });
    window.addEventListener("documentstylesheetsupdated", () => {
      element.shadowRoot.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        style,
      ];
    })
    element.shadowRoot.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      style,
    ];
  }