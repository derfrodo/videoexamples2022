module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    "node": process.versions.node
                }
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
    ],
};
