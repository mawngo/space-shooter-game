export const canvas = document.getElementById("screen");
export const ctx = canvas.getContext("2d");
export const background = document.getElementById("background");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
try {
    Neutralino.init();
} catch (e) {
    console.log("Not running in desktop");
}
