//#region changeUrlPath

/**@param {string} path */
export function changeUrlPath(path) {
  const reRenderEvent = new CustomEvent("rerender", {
    detail: window.location.pathname,
  });
  window.history.pushState("", "", path);
  window.dispatchEvent(reRenderEvent);
}
window.changeUrlPath = changeUrlPath;

//#region reRender

/**
 * Triggers a custom "rerender" event on the window object.
 * This function creates a new CustomEvent with the name "rerender" and dispatches it.
 */
export function reRender() {
  const reRenderEvent = new CustomEvent("rerender", { detail: "" });
  window.dispatchEvent(reRenderEvent);
}
window.reRender = reRender;

//#region urlParams

/**
 * Extracts URL parameters from the given object.
 *
 * @param {Object} params - The object containing URL parameter groups.
 * @param {Object} params[].groups - The groups of URL parameters.
 * @returns {Object} An object containing the extracted URL parameters.
 */
function urlParams(params) {
  let urlParams = {};
  for (let name in params) {
    if (params[name] == undefined) continue;
    for (let value in params[name].groups) {
      if (value == "0") continue;
      urlParams[value] = params[name].groups[value];
    }
  }

  return urlParams;
}

//#region simpleRoutes

/**
 * Handles simple routing based on the provided routes object.
 *
 * @param {Object} routes - An object where keys are URL patterns and values are functions to execute when the pattern matches the current URL.
 * @returns {*} The result of the route handler function if a matching route is found.
 */
export function simpleRoutes(routes = {}) {
  for (let path in routes) {
    let url = new URLPattern({ pathname: path });

    if (url.test(window.location.href))
      return routes[path](urlParams(url.exec(window.location.href)));
  }
}
window.simpleRoutes = simpleRoutes;

//#region simpleRoutesAsync

/**
 * Asynchronously handles simple route matching and execution.
 *
 * @param {Object} routes - An object where keys are URL patterns and values are either functions or module paths.
 * @returns {Promise<*>} - The result of the executed route function or module.
 *
 * @example
 * const routes = {
 *   '/home': async () => { handle home route },
 *   '/about': './aboutPageModule.js'
 * };
 * simpleRoutesAsync(routes);
 */
export async function simpleRoutesAsync(routes = {}) {
  for (let path in routes) {
    let url = new URLPattern({ pathname: path });

    if (typeof routes[path] == "function") {
      if (url.test(window.location.href))
        return await routes[path](urlParams(url.exec(window.location.href)));
    } else {
      if (url.test(window.location.href)) {
        let page = (await import(routes[path])).default;
        if (await page)
          return await page(urlParams(url.exec(window.location.href)));
      }
    }
  }
}
window.simpleRoutesAsync = simpleRoutesAsync

//#region createImageFromArrayBuffer

/**
 * Creates an HTMLImageElement from an ArrayBuffer.
 *
 * @param {ArrayBuffer} arrayBuffer - The ArrayBuffer containing image data.
 * @param {string} [mimeType="image/png"] - The MIME type of the image. Defaults to "image/png".
 * @returns {HTMLImageElement} The created image element.
 */
export function createImageFromArrayBuffer(
  arrayBuffer,
  mimeType = "image/png",
) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.src = url;
  return img;
}
window.createImageFromArrayBuffer = createImageFromArrayBuffer;
