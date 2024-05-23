import BinaryExample from "./pages/examples/binary.js";
import CameraExample from "./pages/examples/camera.js";
import IndexedDBExample from "./pages/examples/indexeddb.js";
import DragAndDropExample from "./pages/examples/drag/drag.js";
import ScrollSnapExample from "./pages/examples/scrollsnap/scrollsnap.js";
import { createElement, importCSS } from "./FastHTML.js";
import DateTime, { Duration } from "./components/DateTime.js";

export default async function App() {
  // return await CameraExample();
  // return await BinaryExample();
  // return await IndexedDBExample();
  // return await DragAndDropExample();

  window.DateTime = DateTime;
  window.Duration = Duration;

  return await ScrollSnapExample();
}
