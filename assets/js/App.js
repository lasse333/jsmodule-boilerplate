import { addChildren, createElement } from "./FastHTML.js";
import IndexedDB from "./components/IndexedDB.js";

async function App() {
  let fridge = new IndexedDB("fridge", [
    { storeName: "items", dataType: "object" },
    { storeName: "images", dataType: "arrayBuffer" },
  ]);
  await fridge.open();

  const { items, images } = fridge.tables;

  let buffer = new Uint8Array([1, 2, 3]).buffer;

  let myImage = await images.add(buffer);
  await items.add({ image: myImage, name: "hello" });
  console.log(await myImage);
  console.log(await images.get(myImage));

  console.log(fridge);

  let header;
  let main;
  let footer;

  addChildren(document.body, [
    (header = createElement("header")),
    (main = createElement("main")),
    (footer = createElement("footer")),
  ]);
}

export default App;
