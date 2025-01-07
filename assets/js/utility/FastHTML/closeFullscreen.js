/**
 * Exits the fullscreen mode if the document is currently in fullscreen.
 * This function handles different browser implementations for exiting fullscreen mode.
 */
export default function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }