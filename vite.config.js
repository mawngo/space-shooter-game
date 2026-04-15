import { resolve } from "node:path";
import { defineConfig } from "vite";
import pkg from "./neutralino.config.json" with { type: "json" };

export default defineConfig({
    base: "./",
    define: {
        "VERSION": JSON.stringify(pkg.version)
    },
    build: {
        outDir: "resources",
        rollupOptions: {
            input: {
                guide: resolve(__dirname, "guide.html"),
                index: resolve(__dirname, "index.html"),
                game: resolve(__dirname, "game.html")
            }
        }
    }
});
