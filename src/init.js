import { app as a, events as e, init, os, window as w } from "@neutralinojs/lib";

window.localStorage.setItem("version", VERSION);

try {
    init();
    window.Neu = {
        window: w,
        app: a,
        events: e,
        os: os
    };

    if (!window.gameQuit) {
        window.gameQuit = () => {
            window.Neu.app.exit();
        };
        window.Neu.events.on("windowClose", () => {
            document.dispatchEvent(new CustomEvent("gameQuit"));
        });
    }
    console.log("Running in desktop");
} catch (e) {
    // Ignore.
}


// Setup quit event.
if (window.gameQuit) {
    const quit = document.getElementById("quit");
    quit.addEventListener("click", async function() {
        document.dispatchEvent(new CustomEvent("gameQuit", { bubbles: true }));
    });
    quit.style.removeProperty("display");
}
document.addEventListener("gameQuit", () => {
    if (window.game) {
        window.game.stop();
    }
    if (window.gameQuit) {
        window.gameQuit();
    }
});
