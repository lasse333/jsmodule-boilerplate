import { changeStyle, createElement } from "../FastHTML.js";


export default function ImageSlider(imagesIn=[]) {

    let slider
    let images = imagesIn
    let showing = 0
    let scrollSettings = {inline: "center", behavior: "smooth", block: "nearest"}
    let icons = {
        left: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDcyMiA3MjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjU7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsLTgyNCwwKSI+CiAgICAgICAgPGcgaWQ9IkxlZnQiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsNDUyLjI2LC0xNzguMzQpIj4KICAgICAgICAgICAgPHJlY3QgeD0iMzcyLjMyNSIgeT0iMTc4LjM0IiB3aWR0aD0iNzIwLjQ2IiBoZWlnaHQ9IjcyMC40NiIgc3R5bGU9ImZpbGw6bm9uZTsiLz4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDAuNzA5NzI0LDE2NDYuMjEsMTU3LjI4NSkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTczMi41NTUsMTc4LjM0TDEwOTQuNjMsNTQwLjQxMUw3MzIuMDMsOTAzLjAwNyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjExNS4zM3B4OyIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K",
        right: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDcyMSA3MjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjU7Ij4KICAgIDxnIGlkPSJSaWdodCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMzcyLjMyNSwtMTc4LjM0KSI+CiAgICAgICAgPHJlY3QgeD0iMzcyLjMyNSIgeT0iMTc4LjM0IiB3aWR0aD0iNzIwLjQ2IiBoZWlnaHQ9IjcyMC40NiIgc3R5bGU9ImZpbGw6bm9uZTsiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwwLjcwOTcyNCwtMTgwLjQ0NywxNTcuMjg1KSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03MzIuNTU1LDE3OC4zNEwxMDk0LjYzLDU0MC40MTFMNzMyLjAzLDkwMy4wMDciIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxMTUuMzNweDsiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
    }
    let buttonStyle = {
        background: "none",
        border: "none",
        padding: "10px"
    }
    let iconStyle = {
        height: "2rem",
        filter: "invert(1) drop-shadow(0 0 2px black)"
    }
    let dots = []

    images.forEach((image, index) => {
        changeStyle(image, {
            objectFit: "contain"
        })

        dots.push(createElement("button", {style: {
            width: "40px",
            padding: "3px 5px",
            margin: "5px",
            boxShadow: "0 0 2px 0 black",
            backgroundColor: "white",
            border: "none"
        }, onclick: () => {
            showing = index
            image.scrollIntoView(scrollSettings)
        }}))
    })

    function right() {
        showing = (showing+1)%images.length
        images[showing].scrollIntoView(scrollSettings)
    }

    function left() {
        showing = showing == 0 ? images.length-1 : showing-1
        images[showing].scrollIntoView(scrollSettings)
    }

    window.addEventListener("resize", () => {
        images[showing].scrollIntoView({inline: "center", block: "nearest", behavior: "auto"})
    })

    slider = createElement("div", {className: "slider",style: {
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr",
        width: "100%",
    }}, [
        createElement("div", {className: "slider-images", style: {
            gridRow: "1/2",
            gridColumn: "1/2",
            display: "flex",
            overflow: "hidden",
            width: "100%"
        }}, images),
        createElement("div", {className: "slider-controls", style: {
            gridRow: "1/2",
            gridColumn: "1/2",
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
        }}, [
            createElement("button", {style: buttonStyle, onclick: () => {
                left()
            }}, [
                createElement("img", {src: icons.left, style: iconStyle})
            ]),
            createElement("div", {className: "Selector", style: {
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: "10px"
            }}, dots),
            createElement("button", {style: buttonStyle, onclick: () => {
                right()
            }}, [
                createElement("img", {src: icons.right, style: iconStyle})
            ])
        ]),
    ])

    //console.log(getComputedStyle(slider))

    return slider
}