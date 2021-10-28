const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

const urlPlaceholder = "{blobStore}";

module.exports = async (env, options) => {
    return {
        devtool: "source-map",
        entry: {
            main: "./src/index.ts",
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: "ts-loader",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                chunks: ["main"],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        to: "[name][ext]",
                        from: "manifest.xml",
                        transform(content) {
                            return content
                                .toString()
                                .replace(
                                    new RegExp(urlPlaceholder, "g"),
                                    process.env.URL
                                );
                        },
                    },
                    {
                        from: "./src/assets",
                        to: "assets",
                        force: true,
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
        ],
        devServer: {
            open: true,
            port: 3000,
        },
    };
};
