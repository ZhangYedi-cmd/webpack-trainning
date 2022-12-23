const path = require("path");
const webpack = require("webpack");

/**
 * 打包一个JS文件
 */
const f1 = () => webpack({
  entry: './modules/cjs.js',
  mode: 'none',
  output: {
    // clear: true,
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist/'),
  },
})

const f2 = () => webpack({
  entry: './modules/cjs.js',
  mode: 'none',
  output: {
    iife: false,
    pathinfo: 'verbose'
  }
})

f1().run(res => {
  console.log("build done")
})
