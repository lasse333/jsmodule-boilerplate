/**
 * Converts a string to a URL object relative to the current location.
 *
 * @param {string} stringIn - The input string to be converted to a URL.
 * @returns {URL} The URL object created from the input string.
 */
export default function stringToPath(stringIn) {
    const url = new URL(stringIn, location.href);
  
    return url;
  }