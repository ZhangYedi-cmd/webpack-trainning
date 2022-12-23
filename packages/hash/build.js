const path = require('path');
const webpack = require("webpack");

const f1 = () => webpack({
  mode: 'none',
  entry: './modules/cjs.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: 'main.[contenthash:6].js'
  }
})

const f2 = () => webpack({
  mode: 'none',
  entry: './modules/cjs.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: '[name].[contenthash:6].js',
    hashFunction: 'xxhash64'
  }
})


f2().run(res => {
  console.log("build done")
})
