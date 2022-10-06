import { addChildren, changeStyle, clearChildren, createElement } from "../FastHTML.js";

let modal

export default function Modal(input) {

    clearChildren(modal)

    addChildren(modal, [input])

    document.body.style.overflow = "hidden"
    
    changeStyle(modal, {
        display: "grid",
        overflowY: "scroll"
    })

    modal.scrollTo(0,0)

}

export function ModalBase() {

    window.addEventListener("keyup", (e) => {
        if (e.code == "Escape") closeModal()
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
    document.body.style = null
}