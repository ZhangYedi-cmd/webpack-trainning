const fs = require('fs')
const path = require('path')
// const swc = require('@swc/core')
const {parse} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

/**
 * {
 *   deps: [
 *     {
 *       filename: 'sum.js',
 *       deps:[],
 *       code: 'exports.sum = (...args) => {args.reduce((prev,curr) => prev + curr)}'
 *       moduleId: 1
 *     }
 *   ]
 *   code: 'console.log(this is main.js)',
 *   filename: 'main.js',
 *   moduleId: 0
 * }
 *
 * 将当前module，deps拍平到一个数组中
 *
 * [
 *  {
 *    filename: 'main.js',
 *    code: 'console.log(this is main.js)',
 *    moduleId: 0
 *  },
 *  {
 *    filename: 'sum.js',
 *    deps:[],
 *    code: 'exports.sum = (...args) => {args.reduce((prev,curr) => prev + curr)}'
 *    moduleId: 1
 *  }
 * ]
 */
function moduleTreeToQueue(moduleTree) {
  const {deps, ...module} = moduleTree
  const moduleQueue = deps.reduce((acc, m) => {
    return acc.concat(moduleTreeToQueue(m))
  }, [module])

  return moduleQueue
}

let moduleId = 0

// parse entry file generate AST
function buildModule(filename) {
  filename = path.resolve(__dirname, filename)
  // 获取模块的code
  const code = fs.readFileSync(filename, 'utf8')
  // code --> ast (babel/parse)
  const ast = parse(code, {
    sourceType: "module"
  })

  // const ast = await swc.parse(code, {
  //   syntax: "ecmascript", // "ecmascript" | "typescript"
  //   comments: false,
  //   script: true,
  //   target: "es2015",
  //   isModule: true,
  // })

  const deps = [] //这个模块的依赖
  const currentModuleId = moduleId

  traverse(ast, {
    enter({node}) {
      // 如果这里是一个require函数
      if (node.type === 'CallExpression' && node.callee.name === 'require') {
        // 拿到require函数的第0个参数，也就是文件名
        const argument = node.arguments[0]
        if (argument.type === 'StringLiteral') {
          // 这里将require函数的名称重新赋值
          // 实际上是使用下面我们定义的模块加载函数__require__
          node.callee.name = "__require__"
          moduleId++;
          const nextFilename = path.join(path.dirname(filename), argument.value)
          // 将require的参数改成moduleId
          argument.value = moduleId
          // const {sum} = require('./sum.js') --> const {sum} = __require__('1')
          deps.push(buildModule(nextFilename))
        }
      }
    }
  })

  return {
    filename,
    deps,
    code: generate(ast).code,
    moduleId: currentModuleId
  }
}

function createModuleWrapper(code) {
  // webpack 中对每个模块都封装了包裹函数
  return `(module, exports, __require__) => {
           ${code}
        }`
}

function createBundleTemplate(entry) {
  const moduleTree = buildModule(entry); // 拿到解析好的moduleTree
  const modules = moduleTreeToQueue(moduleTree) // 所有模块的数组
  // 返回打包后的结果
  return `
  // 维护所有模块的数组
   const __modules__ = [
    ${modules.map(m => createModuleWrapper(m.code))}
  ]

  const __cache__modules__ = {} // 缓存模块保证单例模式

  function __require__(moduleId) {
    // 先判断一下模块是否在缓存中
    if (__cache__modules__[moduleId] !== undefined) {
      return __cache__modules__[moduleId].exports
    }
    // 如果不在，先创建一个新的模块，并写入缓存之中。
    const module = __cache__modules__[moduleId] = {
      exports: {}
    }
    // 执行该模块的代码，将该模块导出的的变量赋值给module的exports
    __modules__[moduleId](module,module.exports,__require__)
    return module.exports
  }

  (() => __require__(0))()
`
}

// exports.createBundleTemplate = createBundleTemplate

const code = createBundleTemplate("./modules/cjs.js")
console.log(eval(code))

