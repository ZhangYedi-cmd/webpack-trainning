const fs = require('fs')
const path = require('path')
const {parse} = require('@babel/parser')
const t = require("@babel/types");
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

/**
 * 构建解析AST
 * @param entry
 */
const buildModule = (filename) => {
  filename = path.resolve(__dirname, filename)
  // 获取模块的code
  const code = fs.readFileSync(filename, 'utf8')
  const ast = parse(code, {
    sourceType: "module"
  })
  let deps = [] //依赖list
  let moduleId = 0
  let exportModuleMap = {} // filename: moduleName
  traverse(ast, {
    // 识别exports并替换掉, 将所有要导出的模块收集到一个对象中
    ExportNamedDeclaration(item) {
      // const {node} = item
      // item.replaceWith(node.declaration)
      // const moduleName = node.declaration.declarations[0].id.name
      // exportModuleMap[moduleName] = node
      // item.insertBefore(
      //   t.objectExpression(
      //     [
      //       t.objectProperty(
      //         t.identifier(moduleName),
      //         t.identifier(moduleName)
      //       )
      //     ]
      //   )
      // )
    },
    // 替换 import() from ....
    ImportDeclaration(item) {
      const {node} = item
      const importModules = node.specifiers
      const depPath = path.resolve(__dirname, node.source.value)
      importModules.map(module => {
        const { name } = module.imported
        item.replaceWith(
          t.variableDeclaration(
            'const',
            [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(
                  t.identifier(`__webpack__require__`),
                  [t.numericLiteral(moduleId++)]
                )
              )
            ]
          )
        )
      })
      deps.push(buildModule(depPath))
    },
  })
  return {
    filename,
    deps,
    code: generate(ast).code,
    moduleId: moduleId
  }
}

/**
 * create esm file template
 * @param entry 入口文件路径
 */
const createBundleTemplate = (entry) => {
  const moduleTree = buildModule(entry)
  console.log(moduleTree)
}

const code = createBundleTemplate('./index.js')

// cjs
/**
 * module.exports = {
 *   a: 1,
 *   b: 2
 * }
 *
 * const { a } = require("./a.js")
 *
 */


// esm
/**
 * export const sum = (...args) => args.reduce((prev, curr) => prev + curr)
 *  ^
 *  |
 *  |
 * // 模块的包裹函数
 * (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
 *
 *   const sum = (...args) => args.reduce((prev, curr) => prev + curr)
 *
 *   __webpack__require.i = (exports, {
 *     sum : () => sum
 *   })

 * }
 *
 * import sum from './sum.js' -> const sum = __webpack__require__(moduleId)
 *
 * console.log(sum)
 */
