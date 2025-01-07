/**
 * Generates a CSSStyleSheet with the specified layer order.
 *
 * @param {string[]} layersIn - An array of layer names to be included in the CSS layer order.
 * @returns {CSSStyleSheet|null} A CSSStyleSheet object with the specified layer order, or null if no layers are provided.
 */
export default function cssLayerOrder(layersIn) {
    let layers = layersIn ?? [];
    if (layersIn) {
      let css = new CSSStyleSheet();
      css.replaceSync(`@layer ${layers.join(", ")};`);
      return css;
    }
    return null;
  }