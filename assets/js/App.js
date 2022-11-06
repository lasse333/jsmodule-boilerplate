import { addChildren, createElement } from "./FastHTML.js"

function App() {

    let header
    let main
    let footer

    addChildren(document.body, [
        header = createElement("header"),
        main = createElement("main"),
        footer = createElement("footer")
    ])
    
    
}

export default App
