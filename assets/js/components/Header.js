import { createElement } from "../FastHTML.js";

export default function Header() {
    
    let header = createElement("header")
    let fileName

    header.append(createElement("h1", {}, [
        fileName = createElement("span", {innerText: "Image"}),
        createElement("sub", {innerText: ".img333"})
    ]))
    fileName.contentEditable = true

    header.append(
        createElement("form", {}, [
            createElement("input", {type: "number", min: 1, max: 0xffff, value: 24}),
            createElement("input", {type: "number", min: 1, max: 0xffff, value: 24})
        ])
    )


    return header
}