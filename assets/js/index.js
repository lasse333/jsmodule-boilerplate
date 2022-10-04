import App from './App.js';
import mainStyle from "../css/style.css" assert {type: "css"}
// **  IIFE: Immediately Invoked Function Expression  */

(function () {

    document.adoptedStyleSheets = [mainStyle]

    App();
   


})();
