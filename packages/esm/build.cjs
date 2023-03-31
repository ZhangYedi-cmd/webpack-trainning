const path = require("path")
const webpack = require('webpack')

const f1 = () => webpack({
  entry: './cjs.js',
  mode: 'none',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist/"),
  }
})

f1().run(() => {
  console.log("build done")
})
