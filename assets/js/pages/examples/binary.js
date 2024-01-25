import { createElement } from "../../FastHTML.js";
import BinaryBuffer, {
  Byte,
  Short,
  Int,
  Long,
  Float32,
  Float64,
} from "../../components/BinaryBuffer.js";

export default async function BinaryExample() {
  const myData = new BinaryBuffer();

  console.log(myData); // BinaryBuffer

  myData.create("byte", Byte);
  myData.create("short", Short);
  myData.create("int", Int);
  myData.create("long", Long);
  myData.create("float32", Float32);
  myData.create("float64", Float64);

  myData.byte.unsigned = 127;
  console.log(myData.byte.signed); // 127
  myData.byte.unsigned++;
  console.log(myData.byte.signed); // -128

  myData.long.signed = -1;
  console.log(myData.long.unsigned); // 18446744073709551615n

  myData.float32.value = 0.1 + 0.2;
  myData.float64.value = 0.1 + 0.2;

  console.log(myData.float32.value); // 0.30000001192092896
  console.log(myData.float64.value); // 0.30000000000000004
  console.log(0.1 + 0.2); //            0.30000000000000004

  return [
    createElement("header", {}, [createElement("h1", { innerText: "Binary" })]),
    createElement("main", {}, []),
    createElement("footer", {}, []),
  ];
}
