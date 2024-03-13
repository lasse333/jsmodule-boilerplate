import { createElement, importCSS } from "../../../FastHTML.js";

export default async function DragAndDropExample() {
  let tempstyle = await importCSS("assets/js/pages/examples/drag/temp.css");

  let elementBeingDragged = null;

  function startdrag(e) {
    elementBeingDragged = this.children[0];
  }

  function enddrag(e) {
    elementBeingDragged = null;
  }

  function overdrag(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();

    this.append(elementBeingDragged.cloneNode(true));
  }

  return [
    createElement("main", { style: tempstyle }, [
      createElement("section", {}, [
        createElement("div", { class: "item-list" }, [
          createElement(
            "span",
            {
              innerText: "hey",
              draggable: true,
              ondragstart: startdrag,
              ondragend: enddrag,
            },
            [createElement("div", {}, ["<h1>HEY</h1><p>hey</p>"])],
          ),
          createElement(
            "span",
            {
              innerText: "yes",
              draggable: true,
              ondragstart: startdrag,
              ondragend: enddrag,
            },
            [createElement("div", {}, ["<h1>YES</h1><p>yes</p>"])],
          ),
          createElement(
            "span",
            {
              innerText: "hello",
              draggable: true,
              ondragstart: startdrag,
              ondragend: enddrag,
            },
            [createElement("div", {}, ["<h1>HELLO</h1><p>hello</p>"])],
          ),
        ]),
        createElement("div", { ondrop: drop, ondragover: overdrag }),
      ]),
    ]),
  ];
}
