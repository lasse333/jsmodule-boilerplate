import stripUnsafeAttributes from "./stripUnsafeAttributes.js";
import stripUnsafeTags from "./stripUnsafeTags.js";

/**
 * Parses a string into an array of HTML elements.
 * 
 * This function takes a string containing HTML and converts it into an array of HTML elements.
 * If the string does not contain valid HTML tags, it returns an array with a single text node.
 * Any <script> tags found in the HTML string are removed for security reasons.
 *
 * @param {string} string - The HTML string to be parsed.
 * @returns {HTMLElement[]} An array of HTML elements parsed from the input string.
 */
export default function parseStringToHTMLElements(string, options = { extraAllowedTags: [], extraAllowedAttributes: [], strict: false }) {
    let html = []
    if (string.match(/<(?<TAG>.+?)(?:\s+?(?<ATTRIBUTES>(?:\w+(?:=\".*?\")?\s?)*))*\/?>/g)) {
      let parser = new DOMParser();
      html = parser.parseFromString(string, "text/html");
      html.querySelectorAll("script").forEach((scriptTag) => scriptTag.remove());
      
      if (options.strict) {
        html.body.querySelectorAll("*").forEach((element) => {
          stripUnsafeAttributes(element, { extraAllowedAttributes: options.extraAllowedAttributes ?? [] });
          stripUnsafeTags(element, { extraAllowedTags: options.extraAllowedTags ?? [] });
        })
      }
  
      html = Array.from(html.body.children);
    } else {
      html = [document.createTextNode(string)];
    }
    return html;
  }