var path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".js"],
  },
};
