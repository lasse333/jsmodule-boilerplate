export function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

export function createElement(type, attributesIn, childrenIn) {
    let attributes = attributesIn ?? {}
    let children = childrenIn ?? []

    let element = document.createElement(type)
    Object.assign(element, attributes)

    if (attributes.style) changeStyle(element, attributes.style)
    
    addChildren(element, children) 
    
    return element
}

export function changeStyle(parrentElement, style) {
    if (typeof parrentElement == "String") {
        document.querySelectorAll(selectors).forEach((element) => {
            applyStyle(element, style)
        })
    } else {
        applyStyle(parrentElement, style)
    }
}

function applyStyle(element, style) {
    if (!(style instanceof CSSStyleSheet)) Object.assign(element.style, style)
    else {
            if (!element.shadowRoot) element.attachShadow({mode: "open"})
            element.shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, style]
    }
}

export function addChildren(element, children) {
    children.forEach(child => {
        if (element.shadowRoot) element.shadowRoot.appendChild(child)
        else element.appendChild(child)
    })

    return element
}

export function changeUrlPath(path) {

    window.history.pushState("", "", path);

}

export function clearChildren(parrentElement) {
    if (typeof parrentElement == "String") {
        document.querySelectorAll(parrentElement).forEach((element) => {
            element.innerHTML = ""
        })
    } else {
        parrentElement.innerHTML = ""
    }
}