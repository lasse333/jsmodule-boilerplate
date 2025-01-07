/**
 * Adds a CSSStyleSheet to the document's adopted style sheets and dispatches a custom event.
 *
 * @param {CSSStyleSheet} css - The CSSStyleSheet object to be added to the document.
 */
export default function addCSStoDocument(css) {
    let styleSheets = [...document.adoptedStyleSheets];
    styleSheets.push(css);
    document.adoptedStyleSheets = styleSheets;
    const documentStyleSheetUpdateEvent = new CustomEvent("documentstylesheetsupdated");
    window.dispatchEvent(documentStyleSheetUpdateEvent);
  }