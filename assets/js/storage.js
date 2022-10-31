export function getStorage(item) {
    return window.localStorage.getItem(item)
}

export function saveStorage(item, data) {
    window.localStorage.setItem(item, data)
}