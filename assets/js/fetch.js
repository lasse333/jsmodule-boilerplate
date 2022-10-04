import { getStorage, saveStorage } from "./storage.js"

export async function get(url, saveUrl=url) {
    let response
    try {
        response = await fetch(url)
    } catch {
        return getStorage(saveUrl)
    }
    let text = await response.text()

    if (response.ok) saveStorage(saveUrl, text)

    return text
}

export async function getImage(url, saveUrl=url) {
    let response
    try {
        response = await fetch(url)
    } catch {
        return getStorage(saveUrl)
    }
    let data = new Uint8Array(await response.arrayBuffer())
    
    let output = ""

    data.forEach(code => output += String.fromCharCode(code))

    output = btoa(output);

    if (response.ok) saveStorage(saveUrl, output)

    return output
}
