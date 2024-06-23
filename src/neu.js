import { app as a, events as e, init, os, window as w } from "@neutralinojs/lib";

try {
    init();
    const quit = document.getElementById("quit");
    quit.addEventListener("click", async function() {
        if (window.Neu) {
            await window.Neu.app.exit();
        }
    });
    quit.style.removeProperty("display");
    window.Neu = {
        window: w,
        app: a,
        events: e,
        os: os
    };
    console.log("Running in desktop");
} catch (e) {
    console.log("Running in browser");
}
