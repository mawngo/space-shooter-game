const path = require("path");

module.exports = {
    entry: {
        game: "./src/index.js",
        neu: "./src/neu.js"
    },
    mode: "production",
    target: "web",
    resolve: {
        mainFields: ["main", "module"],
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    output: {
        path: path.resolve(__dirname, "resources"),
        filename: "[name].min.js"
    },
    experiments: {
        topLevelAwait: true
    }
};
