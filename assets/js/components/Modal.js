import { addChildren, changeStyle, clearChildren, createElement } from "../FastHTML.js";

let modal
let visable = false
let scrollPos = 0

export default function Modal(input) {

    clearChildren(modal)

    addChildren(modal, [input])

    visable = true
    scrollPos = window.scrollY
    
    changeStyle(modal, {
        display: "grid",
        overflowY: "scroll"
    })

}

export function ModalBase() {

    window.addEventListener("scroll", () => {
        if (visable) window.scroll({top: scrollPos, behavior: 'auto'})
    })

    modal = createElement("div", {id: "modal", style: {
        display: "none",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        padding: "20px",
        backdropFilter: "blur(2px) brightness(0.7)",
        placeItems: "center"
    }, onclick: (e) => {

        if (e.target.id == "modal") {
            closeModal()
        }

    }})

    return modal
}

export function closeModal() {
    modal.style.display = "none"
    visable = false
}
