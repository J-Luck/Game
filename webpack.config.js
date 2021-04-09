//引入一个包
const path = require('path');

// 引入html库
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack中的所有配置信息
module.exports = {
    // 入口文件
    entry: "./src/index.ts",

    // 指定打包文件
    output: {
        // 指定打包目录
        path: path.resolve(__dirname, 'dist'),
        // 指定打包后的文件
        filename: "bundle.js",
        // 告诉webpack不用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },

    mode: 'development', // 设置mode

    // 指定webpack打包时使用的模块
    module: {
        // 指定加载规则

        rules: [
            {
                // test 指定规则生效文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    {
                        // 配置加载器
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        // 指定版本
                                        "corejs":"3",
                                        // 使用corejs的方式  suage 按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                 ],
                // 要排除的文件
                exclude: /node-modules/
            },
            // 设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]

    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({
            // title: '自定义title',
            template: './src/index.html'
        }),
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }



}