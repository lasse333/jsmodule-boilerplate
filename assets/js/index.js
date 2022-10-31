import App from './App.js';
import { clearChildren } from './FastHTML.js';
import mainStyle from "../css/style.css" assert {type: "css"}

// **  IIFE: Immediately Invoked Function Expression  */
(function () {

    document.adoptedStyleSheets = [mainStyle]

    App();

    window.addEventListener('rerender', function (e) {
        if (e.detail != window.location.pathname) {
            clearChildren(document.body)
            App()
        }
        
    });
   


})();
