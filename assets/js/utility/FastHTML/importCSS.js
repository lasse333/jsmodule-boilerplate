import stringToPath from "./stringToPath.js";

/**
 * Imports a CSS file and returns it as a CSSStyleSheet object.
 * Optionally, the CSS can be wrapped in a specified layer.
 *
 * @param {string} from - The path to the CSS file.
 * @param {Object} [options] - Optional parameters.
 * @param {string} [options.layer] - The name of the layer to wrap the CSS in.
 * @param {string} [options.priority="auto"] - The priority of the fetch request.
 * @returns {Promise<CSSStyleSheet>} A promise that resolves to a CSSStyleSheet object.
 */
export default async function importCSS(from, {layer, priority} = {priority: "auto"}) {
  let path = from

  if (typeof path === "string") {
    path = stringToPath(path);
  }
  
  let css_text = await fetch(path, {priority});
  css_text = await css_text.text();
  let css_obj = new CSSStyleSheet();
  css_obj.replaceSync(css_text);
  
  if (layer) {
    let layerCSS = new CSSStyleSheet();
    layerCSS.replaceSync(`@layer ${layer} {}`);
    Array.from(css_obj.cssRules).forEach((rule, index) => {
      layerCSS.cssRules[0].insertRule(rule.cssText, index);
    })
    return layerCSS;
  }

  return css_obj;
}