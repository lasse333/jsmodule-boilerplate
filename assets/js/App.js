import Header from "./components/Header.js"
import { addChildren, createElement } from "./FastHTML.js"

function App() {

    let main
    let footer

    addChildren(document.body, [
        Header(),
        main = createElement("main"),
        footer = createElement("footer")
    ])
    
    
}

export default App
