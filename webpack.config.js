module.exports = {
    entry: "./entry.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}