import BinaryExample from "./pages/examples/binary.js";
import CameraExample from "./pages/examples/camera.js";
import IndexedDBExample from "./pages/examples/indexeddb.js";
import DragAndDropExample from "./pages/examples/drag/drag.js";
import {
  createElement,
  importCSS
} from "./FastHTML.js";

export default async function App() {
  // return await CameraExample();
  // return await BinaryExample();
  // return await IndexedDBExample();

  return await DragAndDropExample();
}
