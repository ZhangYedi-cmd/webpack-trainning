const webpack = require("webpack")
const path = require("path");

const f1 = () => webpack({
  entry: './modules/esm/index.js',
  mode: 'none',
  output: {
    filename: 'bundle-test.js',
    path: path.resolve(__dirname, "dist/"),
  }
})

f1().run(() => {
  console.log("build done")
})
