import {
  addChildren,
  clearChildren,
  createElement,
  changeStyle,
} from "../FastHTML.js";

/**
 *
 * @param {Object} inputs
 * @returns {HTMLElement}
 */
export default function Formular(inputs) {
  let form = createElement("form");
  form.richTextInputs = [];
  form.getFormData = () => {
    let data = new FormData(form);

    form.richTextInputs.forEach((input) => {
      data.append(input.textArea.name, input.textArea.value);
    });

    return data;
  };

  form.getJSONData = () => {
    let data = {};

    Array.from(form).forEach((input) => {
      if (input.type == "submit") return;
      data[input.name] = input.value;
    });

    return data;
  };

  for (let inputName in inputs) {
    let element;
    let { type } = inputs[inputName];
    let name = inputName;

    let attributes = {};
    Object.assign(attributes, inputs[inputName]);
    Object.assign(attributes, { name: name });
    delete attributes.type;

    if (type == "textarea") element = createElement(type, attributes);
    else if (type == "html") {
      element = createElement("div", {}, [attributes.value ?? ""]);

      form.richTextInputs.push(
        new RichTextArea(element, {
          attributes,
        })
      );
    } else if (type == "submit") {
      element = createElement("input", inputs[inputName]);
      element.addEventListener("click", function (e) {
        changeStyle(this, { cursor: "progress" });
        setTimeout(function () {
          changeStyle(element, { cursor: "" });
        }, 1000);
      });
    } else if (type == "label")
      element = createElement(
        type,
        Object.assign(attributes, { innerText: name })
      );
    else
      element = createElement(
        "input",
        Object.assign(inputs[inputName], { name })
      );

    addChildren(form, [element]);
  }

  form.onsubmit = (e) => {
    e.preventDefault();
  };

  return form;
}

class RichTextArea {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.selection;

    changeStyle(
      this.element,
      import("../../css/richTextArea.css", { assert: { type: "css" } })
    );
    this.value = this.options.attributes.value;

    this.toolbar = createElement("div", { class: "tool-bar" }, [
      createElement("button", {
        onclick: () => {
          this.setTextStyle({ fontWeight: "bold" });
        },
        innerText: "Make Bold",
      }),
      createElement("button", {
        onclick: () => {
          this.setTextStyle({ color: "#c0392b" });
        },
        innerText: "Make red",
      }),
      createElement("button", {
        onclick: () => {
          this.clearStyle();
        },
        innerText: "Clear Formatting",
      }),
      createElement("button", {
        onclick: () => {
          this.insertList("ul");
        },
        innerText: "Insert Unordered List",
      }),
    ]);

    this.richText = createElement("div", { class: "rich-text" }, [
      this.value ?? "",
    ]);

    this.textArea = createElement(
      "textarea",
      Object.assign(this.options.attributes, {
        value: this.value,
        class: "raw-text",
      })
    );

    clearChildren(this.element);

    addChildren(this.element, [this.toolbar, this.richText, this.textArea]);

    this.richText.contentEditable = true;
    this.richText.oninput = this.inputEvent;
    this.richText.onkeyup = this.selectEvent;
    this.richText.onkeydown = this.selectEvent;
    window.addEventListener("mouseup", this.selectEvent);
  }

  inputEvent = (e) => {
    this.value = this.richText.innerHTML;
    this.textArea.value = this.value;
  };

  selectEvent = () => {
    let highlighted = this.element.shadowRoot.getSelection();
    if (highlighted.rangeCount > 0) this.selection = highlighted.getRangeAt(0);
  };

  setTextStyle = (style) => {
    if (
      this.selection.startContainer === this.selection.endContainer &&
      this.selection.startOffset === 0 &&
      this.selection.endOffset == this.selection.startContainer.length &&
      this.selection.startContainer.parentElement.childNodes.length -
        this.selection.startContainer.parentElement.children.length ===
        1
    ) {
      changeStyle(this.selection.startContainer.parentElement, style);
    } else {
      let content = this.selection.cloneContents();

      let wrapper = createElement("span", { style }, [content]);

      this.selection.deleteContents();
      this.selection.insertNode(wrapper);

      let newSelection = window.getSelection();
      newSelection.setBaseAndExtent(
        wrapper,
        0,
        wrapper,
        wrapper.childNodes.length
      );
      this.selectEvent();
    }

    this.inputEvent();
  };

  clearStyle = () => {
    if (
      this.selection.startContainer === this.selection.endContainer &&
      this.selection.startOffset === 0 &&
      this.selection.endOffset == this.selection.startContainer.length &&
      this.selection.startContainer.parentElement.childNodes.length -
        this.selection.startContainer.parentElement.children.length ===
        1
    ) {
      if (this.selection.startContainer.parentElement.tagName === "SPAN") {
        this.selection.startContainer.parentElement.outerHTML =
          this.selection.startContainer.parentElement.innerHTML;
      }
    } else {
      let text = this.element.shadowRoot
        .getSelection()
        .toString()
        .replaceAll("\n", "<br>");

      let wrapper = createElement("span", { innerHTML: text });

      this.selection.deleteContents();
      this.selection.insertNode(wrapper);

      wrapper.outerHTML = wrapper.innerHTML;
    }

    this.inputEvent();
  };

  insertList = (listtype) => {
    let content;

    if (
      this.selection.startContainer === this.selection.endContainer &&
      this.selection.startOffset === 0 &&
      this.selection.endOffset == this.selection.startContainer.length &&
      this.selection.startContainer.parentElement.childNodes.length -
        this.selection.startContainer.parentElement.children.length ===
        1
    ) {
      content = this.selection.startContainer.parentElement.innerHTML;
      this.selection.startContainer.parentElement.outerHTML = `
            <${listtype}>
                <li>
                    ${content}
                </li>
            </${listtype}>
            `;
    } else {
      let content = this.selection.cloneContents();

      let wrapper = createElement(listtype, {}, [
        createElement("li", {}, [content]),
      ]);

      this.selection.deleteContents();
      this.selection.insertNode(wrapper);

      let newSelection = window.getSelection();
      newSelection.setBaseAndExtent(
        wrapper,
        0,
        wrapper,
        wrapper.childNodes.length
      );
      this.selectEvent();
    }

    this.inputEvent();
  };
}
