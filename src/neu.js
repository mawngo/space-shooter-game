import { app as a, events as e, init, os, window as w } from "@neutralinojs/lib";

try {
    window.localStorage.setItem("version", VERSION);
    init();

    window.Neu = {
        window: w,
        app: a,
        events: e,
        os: os
    };

    const quit = document.getElementById("quit");
    quit.addEventListener("click", async function() {
        if (window.Neu) {
            await window.Neu.app.exit();
        }
    });
    quit.style.removeProperty("display");
    window.Neu.events.on("windowClose", () => {
        if (window.game) {
            window.game.stop();
        }
        window.Neu.app.exit();
    });
    console.log("Running in desktop");
} catch (e) {
    console.log("Running in browser");
}
