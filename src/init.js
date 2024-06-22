import { app as a, events as e, init, window as w } from "@neutralinojs/lib";

export const canvas = document.getElementById("screen");
export const ctx = canvas.getContext("2d");
export const background = document.getElementById("background");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
try {
    init();
    window.Neu = {
        window: w,
        app: a,
        events: e
    };
    await window.Neu.window.focus();
    console.log("Running in desktop");
} catch (e) {
    console.log("Running in browser");
}
