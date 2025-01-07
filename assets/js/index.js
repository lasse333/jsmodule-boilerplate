import App from "./App.js";
import addChildren from "./utility/FastHTML/addChildren.js";
import changeStyle from "./utility/FastHTML/changeStyle.js";
import createElement from "./utility/FastHTML/createElement.js";
import replaceChildren from "./utility/FastHTML/replaceChildren.js";

// **  IIFE: Immediately Invoked Function Expression  */
(async function () {

  addChildren(document.body, [
    createElement("style", {}, [
      `
      @keyframes rotation {
          0% {
              transform: rotate(0deg);
          }
          100% {
              transform: rotate(360deg);
          }
      } 
      `
    ]),
    createElement("div", {
        class:  "loading",
        style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "5px solid lightblue",
            borderBottomColor: "transparent",
            animation: "rotation 1s linear infinite",
        }
    })
  ]);

  replaceChildren(document.body, await App());

  window.addEventListener("rerender", async function (e) {
    // console.log(e.detail, window.location.pathname)
    if (e.detail != window.location.pathname) {
      changeStyle(document.body, { cursor: "wait" });
      let pre_render = await App();

      replaceChildren(document.body, pre_render);
    }

    changeStyle(document.body, { cursor: "" });
  });
})();
