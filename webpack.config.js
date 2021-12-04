const path = require('path');

module.exports = {
    entry: './src/game.js',
    mode: 'production',
    target: 'web',
    resolve: {
        mainFields: ['main', 'module'],
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
        path: path.resolve(__dirname, 'resources'),
        filename: 'game.js',
    },
    experiments: {
        topLevelAwait: true,
    },
};
