/**
 * @param {HTMLElement | string} parrentElement
 * @returns {undefined | HTMLElement}
 *  */
export default function clearChildren(parrentElement) {
    if (typeof parrentElement === "string") {
      document.querySelectorAll(parrentElement).forEach((element) => {
        element.innerHTML = "";
      });
    } else {
      if (parrentElement.shadowRoot) parrentElement.shadowRoot.innerHTML = "";
      parrentElement.innerHTML = "";
      return parrentElement;
    }
  }