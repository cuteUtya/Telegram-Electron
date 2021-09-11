const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/react/index.js',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js',
    },
};
