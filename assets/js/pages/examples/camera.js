import { createElement, changeStyle } from "../../FastHTML.js";
import Camera, { BarcodeScanner } from "../../components/Camera.js";

export default async function CameraExample() {
    let size = 200;
    let camera = new Camera({
      video: { height: size, width: size, facingMode: "environment" },
    });
    let scanner = new BarcodeScanner(camera.videoElement, "ean_13");
    let codeOutput = createElement("p");
    scanner.onScan = (code) => {
      codeOutput.innerText = [
        code.slice(0, 1),
        code.slice(1, 7),
        code.slice(7),
      ].join(" ");
      scanner.stop();
      camera.stopCamera();
      stopCameraButton.replaceWith(startCameraButton);
      stopScannerButton.replaceWith(startScannerButton);
    };
  
    let startCameraButton = createElement("button", {
      onclick: async function () {
        await camera.startCamera();
        this.replaceWith(stopCameraButton);
      },
      innerText: "Start Camera",
    });
    let stopCameraButton = createElement("button", {
      style: { backgroundColor: "red", border: "solid 1px red" },
      onclick: async function () {
        if (scanner.running) {
          scanner.stop();
          stopScannerButton.replaceWith(startScannerButton);
        }
        await camera.stopCamera();
        this.replaceWith(startCameraButton);
      },
      innerText: "Stop Camera",
    });
    let startScannerButton = createElement("button", {
      onclick: async function () {
        if (!camera.running) {
          await camera.startCamera();
          startCameraButton.replaceWith(stopCameraButton);
        }
        await scanner.start();
        this.replaceWith(stopScannerButton);
      },
      innerText: "Start Scanner",
    });
    let stopScannerButton = createElement("button", {
      style: { backgroundColor: "red", border: "solid 1px red" },
      onclick: async function () {
        await scanner.stop();
        this.replaceWith(startScannerButton);
      },
      innerText: "Stop Scanner",
    });

  
    let header;
    let main;
    let footer;
    
    return [
      (header = createElement("header", {}, [
        createElement("h1", { innerText: "Camera" }),
      ])),
      (main = createElement("main", {}, [
        changeStyle(camera.videoElement, { maxHeight: "480px", width: "100%" }),
        codeOutput,
      ])),
      (footer = createElement("footer", {}, [
        startCameraButton,
        "BarcodeDetector" in window ? startScannerButton : [],
      ])),
    ];
}