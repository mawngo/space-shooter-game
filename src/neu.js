import { app as a, events as e, init, os, window as w } from "@neutralinojs/lib";

try {
    init();
    window.Neu = {
        window: w,
        app: a,
        events: e,
        os: os
    };
    await window.Neu.window.focus();
    console.log("Running in desktop");
} catch (e) {
    console.log("Running in browser");
}
