module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3
            },
            '@babel/preset-react',

        ],
          "@vue/babel-preset-jsx"
    ],
    "plugins": [
        [

            "@babel/plugin-transform-runtime",
            {
                // "absoluteRuntime": false,
                "corejs": false,
                // "helpers": true,
                "regenerator": true,
                // "useESModules": false
            },

        ]]

}
