import App from "./App.js";
import { clearChildren, addChildren, changeStyle } from "./FastHTML.js";
import mainStyle from "../css/defaults/style.css" assert { type: "css" };

// **  IIFE: Immediately Invoked Function Expression  */
(async function () {
  document.adoptedStyleSheets = [mainStyle];

  addChildren(document.body, await App());

  window.addEventListener("rerender", async function (e) {
    // console.log(e.detail, window.location.pathname)
    if (e.detail != window.location.pathname) {
      changeStyle(document.body, { cursor: "wait" });
      let pre_render = await App();

      clearChildren(document.body);
      addChildren(document.body, pre_render);
    }

    changeStyle(document.body, { cursor: "" });
  });
})();
