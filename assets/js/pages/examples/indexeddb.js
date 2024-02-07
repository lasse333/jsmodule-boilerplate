import { createElement } from "../../FastHTML.js";
import IndexedDB from "../../components/IndexedDB.js";

export default async function IndexedDBExample() {
  let tasksdb = new IndexedDB("todolist", [
    { storeName: "tasks", dataType: "object" },
  ]);
  await tasksdb.open();

  const { tasks } = tasksdb.tables;

  let addTaskButton = createElement("button", {
    innerText: "+ Add Task",
    style: {
      width: "100%",
      display: "block",
      margin: "0",
      borderRadius: "0",
    },
    onclick: function () {
      this.replaceWith(
        createElement("div", {}, [
          createElement(
            "form",
            {
              style: {
                display: "flex",
              },
            },
            [
              createElement("input", {
                style: {
                  flex: "1",
                },
              }),
              createElement("input", {
                type: "submit",
                value: "Add",
                style: {
                  margin: "0",
                  padding: "10px",
                  borderRadius: "0",
                },
              }),
            ],
          ),
        ]),
      );
    },
  });

  return [
    createElement("header", {}, [
      createElement("h1", { innerText: "IndexedDB" }),
    ]),
    createElement("main", {}, [addTaskButton]),
    createElement("footer", {}, []),
  ];
}
