import { app as a, events as e, init, os, window as w } from "@neutralinojs/lib";

window.localStorage.setItem("gameVersion", getParam("gameVersion") || VERSION);
window.localStorage.setItem("gameControlMode", getParam("gameControlMode"));
window.addEventListener("load", () => {
    document.dispatchEvent(new CustomEvent("gameVersion", {
        detail: { gameVersion: window.localStorage.getItem("gameVersion") },
        bubbles: true
    }));
    document.dispatchEvent(new CustomEvent("gameControlMode", {
        detail: { gameControlMode: window.localStorage.getItem("gameControlMode") },
        bubbles: true
    }));
});

document.addEventListener("gameQuit", () => {
    if (window.game) {
        window.game.stop();
    }
    if (window.onGameQuit) {
        try {
            window.onGameQuit();
        } catch (e) {
            console.error(e);
        }
    }
});

// Setup NeutralinoJS if possible.
window.onGameQuit = () => window.close();
try {
    init();
    window.Neu = {
        window: w,
        app: a,
        events: e,
        os: os
    };

    window.Neu.events.on("windowClose", () => {
        document.dispatchEvent(new CustomEvent("gameQuit"));
        console.log("quit");
    });
    window.onGameQuit = () => window.Neu.app.exit();
    console.log("Running in desktop");
} catch (e) {
    // Ignore.
}

// Bind hooks.
if (window.IntegrationHooks) {
    const hooks = window.IntegrationHooks;
    if (hooks.onGameQuit) {
        window.onGameQuit = hooks.onGameQuit;
    }
    if (hooks.onGameVersion) {
        hooks.onGameVersion(window.localStorage.getItem("gameVersion"));
    }
}

// Setup quit button.
const quit = document.getElementById("quit");
if (quit) {
    quit.addEventListener("click", async function() {
        document.dispatchEvent(new CustomEvent("gameQuit", { bubbles: true }));
    });
}

// Preserve search params.
document.querySelectorAll("a[href]").forEach(a => {
    if (!a.href.includes("?")) {
        a.href = a.href + window.location.search;
        return;
    }
    a.href = a.href + "&" + window.location.search.substring(1);
});


function getParam(name, from = ["search", "window"]) {
    let param = "";
    if (from.includes("search")) {
        param = new URLSearchParams(window.location.search).get(name);
        if (param) return param;
    }

    if (from.includes("window")) {
        param = window[name];
        if (param) return param;
    }

    if (from.includes("referrer") && document.referrer) {
        param = new URL(document.referrer).searchParams.get(name);
        if (param) return param;
    }

    if (from.includes("localStorage")) {
        param = localStorage.getItem(name);
        if (param) return param;
    }

    if (from.includes("cookies")) {
        param = (() => {
            const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
            if (match) return match[2];
        })();
        if (param) return param;
    }
    return "";
}
