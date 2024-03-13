import { createElement, importCSS } from "../../../FastHTML.js";

export default async function ScrollSnapExample() {
  let tempstyle = await importCSS(
    "assets/js/pages/examples/scrollsnap/temp.css",
  );

  return [
    createElement("main", { style: tempstyle }, [
      createElement("div", { class: "page-container", dir: "ltr" }, [
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Mandag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Tirsdag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Onsdag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Torsdag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Fredag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Lørdag" }),
        ]),
        createElement("div", { class: "page" }, [
          createElement("h1", { innerText: "Søndag" }),
        ]),
      ]),
    ]),
  ];
}
