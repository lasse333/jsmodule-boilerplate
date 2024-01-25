import { createElement } from "../../FastHTML.js";
import BinaryBuffer, {
  Byte,
  Short,
  Int,
  Long,
} from "../../components/BinaryBuffer.js";

export default async function BinaryExample() {
  const myData = new BinaryBuffer();

  console.log(myData); // BinaryBuffer

  myData.create("byte", Byte);
  myData.create("short", Short);
  myData.create("int", Int);
  myData.create("long", Long);

  myData.byte.unsigned = 127;
  console.log(myData.byte.signed); // 127
  myData.byte.unsigned++;
  console.log(myData.byte.signed); // -128

  myData.long.signed = -1;
  console.log(myData.long.unsigned); // 18446744073709551615n

  return [
    createElement("header", {}, [createElement("h1", { innerText: "Binary" })]),
    createElement("main", {}, []),
    createElement("footer", {}, []),
  ];
}
