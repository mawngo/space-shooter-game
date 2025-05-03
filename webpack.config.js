const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        game: "./src/index.js",
        neu: "./src/neu.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./neutralino.config.json").version)
        })
    ],
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
