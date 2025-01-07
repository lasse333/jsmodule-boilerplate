//#region openFullscreen

/**
 * Opens the given element in fullscreen mode.
 * 
 * This function attempts to use the standard `requestFullscreen` method,
 * and falls back to vendor-specific methods for Safari and IE11.
 * 
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 */
export default function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
    } else {
        console.error("Fullscreen API is not supported.");
    }
}