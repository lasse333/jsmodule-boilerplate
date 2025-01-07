// import BinaryExample from "./pages/examples/binary.js";
// import CameraExample from "./pages/examples/camera.js";
// import IndexedDBExample from "./pages/examples/indexeddb.js";
// import DragAndDropExample from "./pages/examples/drag/drag.js";
// import ScrollSnapExample from "./pages/examples/scrollsnap/scrollsnap.js";
// import DateTime, { Duration } from "./components/DateTime.js";

export default async function App() {

  if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("/service_worker.js", {
      scope: "/",
      type: "module",
    }).then(
      (registration) => {
        console.log("Service worker registration succeeded:", registration);
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`);
      },
    );
  } else {
    console.error("Service workers are not supported.");
  }

  // let icons = await importCSS("assets/css/material-icons.css", "fonts");
  // let mainStyle = await importCSS("assets/css/defaults/style.css", "base");
  // let borderStyle = await importCSS("assets/css/defaults/border.css");
  // let colourStyle = await importCSS("assets/css/defaults/colours.css");
  // let shadowStyle = await importCSS("assets/css/defaults/shadows.css");

  // document.adoptedStyleSheets = [cssLayerOrder(["fonts", "borders", "base", "colours", "shadows"]), icons, borderStyle, mainStyle, colourStyle, shadowStyle];
  

  // return await CameraExample();
  // return await BinaryExample();
  // return await IndexedDBExample();
  // return await DragAndDropExample();
  // return await ScrollSnapExample();

  // window.DateTime = DateTime;
  // window.Duration = Duration;

  // return createElement("div", {}, [
  //   "<h2 onclick='console.log(this)' onload='console.log(this)' id='yes' href='#yes'>Hejsa</h2>", // shows up with only href attribute
  //   "<main onclick='console.log(this)' onload='console.log(this)' id='yes' href='#yes'>Hejsa</main>", // doenst show up
  //   parseStringToHTMLElements("<main onclick='console.log(this)' onload='console.log(this)' id='yes' href='#yes'>Hejsa</main>"),
  //   createElement("h1", { innerText: "Hello World" }),
  //   "Hejsa",
  // ]);
}
