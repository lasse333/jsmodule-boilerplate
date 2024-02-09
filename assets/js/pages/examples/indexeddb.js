import { createElement } from "../../FastHTML.js";
import IndexedDB from "../../components/IndexedDB.js";

export default async function IndexedDBExample() {
  let tasksdb = new IndexedDB("todolist", [
    { storeName: "tasks"},
  ]);
  await tasksdb.open();

  const { tasks } = tasksdb.tables;

  let addTaskTextInput = createElement("input", {
    style: {
      flex: "1",
    },
  })

  let addTaskForm = createElement("div", {}, [
    createElement(
      "form",
      {
        style: {
          display: "flex",
        },
        onsubmit: async function (e) {
          e.preventDefault()

          tasks.add(addTaskTextInput.value)
          taskList.replaceWith(taskList = await taskListCreator())

          addTaskForm.replaceWith(addTaskButton)
          addTaskTextInput.value = ""
        }
      },
      [
        addTaskTextInput,
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
  ])

  let addTaskButton = createElement("button", {
    innerText: "+ Add Task",
    style: {
      width: "100%",
      display: "block",
      margin: "0",
      borderRadius: "0",
    },
    onclick: function () {
      this.replaceWith(addTaskForm);
      addTaskTextInput.focus()
    },
  });

  let taskList = await taskListCreator()

  async function taskListCreator() {
    let allTasks = (await tasks.getAll()).map((e) => {
      return createElement("li", {id: e.id, style: {
        display: "flex",
      }}, [
        createElement("span", {innerText: e.data, style: {
          padding: "10px",
          flex: 1
        }}),
        createElement("button", {innerText: "X", onclick: async function() {
          tasks.delete(e.id)
          taskList.replaceWith(taskList = await taskListCreator())
        }})
      ])
    })
    return createElement("ul", {class: "task-list", style: {
      display: "flex",
      flexDirection: "column",
    }}, allTasks)
  }

  return [
    createElement("header", {}, [
      createElement("h1", { innerText: "IndexedDB" }),
    ]),
    createElement("main", {}, [
      addTaskButton,
      taskList,
      // createElement("button", {type: "button", onclick: async function() {
      //   console.log(await tasks.getAll())
      // }})
    ]),
    createElement("footer", {}, []),
  ];
}
