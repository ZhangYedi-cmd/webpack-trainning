const path = require('path');
const webpack = require("webpack");

const f1 = () => webpack({
  mode: 'none',
  entry: './modules/index.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: 'main.[contenthash:6].js'
  }
})

const f2 = () => webpack({
  mode: 'none',
  entry: './modules/index.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: '[name].[contenthash:6].js',
    hashFunction: 'xxhash64'
  }
})

const f3 = () => webpack({
  mode: 'none',
  entry: './modules/index.js',
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: '[name].[contenthash:6].js',
    hashFunction: 'xxhash64',
  },
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    runtimeChunk: true
  }
})

f3().run(res => {
  console.log("build done")
})

// 未引入hello.js
// main.e26fc0
// 1.a935502


// 引入hello.js
// main.9c3d26.js
// 1.048b47.js

// f3().run(res => {
//   console.log("build done")
// })

// 变更：ChunkId, ModuleID
// 在一个module中引入一个新的module,会导致 __webpack__modules__ 对于module分配的ModuleId发生变化。
// sum.js
//    sum func()


// 变更后
// sum.js
//    sum func()
//    hello func()

