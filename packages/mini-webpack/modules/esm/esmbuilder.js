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
  let moduleId = 1
  let exportModuleMap = {} // filename: moduleName
  traverse(ast, {
    // 识别exports并替换掉, 将所有要导出的模块收集到一个对象中
    ExportNamedDeclaration(item) {
      const {node} = item
      item.replaceWith(node.declaration)
      const moduleName = node.declaration.declarations[0].id.name
      exportModuleMap[moduleName] = node
      item.insertAfter(
        t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(
              t.identifier("__webpack__exports__map"),
              t.identifier(moduleName)
            ),
            t.identifier(moduleName)
          )
        )
      )
    },
    // 替换 import() from ....
    ImportDeclaration(item) {
      const {node} = item
      const importModules = node.specifiers
      const depPath = path.resolve(__dirname, node.source.value)
      importModules.map(module => {
        const {name} = module.imported
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
 * 拍平ast，收集到一个数组中
 * @param moduleTree
 */
const moduleTreeToQueue = (moduleTree) => {
  const {deps, ...module} = moduleTree
  const moduleQueue = deps.reduce((acc, m) => {
    return acc.concat(moduleTreeToQueue(m))
  }, [module])
  return moduleQueue
}

const createModuleWrapper = (module) => {
  return `
 (_,__webpack_exports__, __webpack_require__) => {
    const __webpack__exports__map = {}
    __webpack_require__.r(__webpack_exports__); // 标记ESM模块
      ${module}
    __webpack_require__.d(__webpack_exports__, __webpack__exports__map); // 拷贝属性
 }
  `
}

/**
 * create esm file template
 * @param entry 入口文件路径
 */
const createBundleTemplate = (entry) => {
  const moduleTree = buildModule(entry)
  const modules = moduleTreeToQueue(moduleTree)
  return `
       const __webpack__modules__ = [
           ${modules.map(m => createModuleWrapper(m.code))}
       ]

      const __webpack__module__cache__ = {}

      const __webpack__require__ = (moduleId) => {
        const cacheModule = __webpack__module__cache__[moduleId]
        if (cacheModule !== undefined) {
          return cacheModule.exports
        }
        const module = __webpack__module__cache__[moduleId] = {
          exports: {}
        }
        __webpack__modules__[moduleId](module, module.exports, __webpack__require__)
        return module.exports
      }
      
      __webpack__require__.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
        }
        Object.defineProperty(exports, '__esModule', {value: true});
      };
      
      __webpack__require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      
      __webpack__require__.d = (exports, definition) => {
        for (var key in definition) {
          if (__webpack__require__.o(definition, key) && !__webpack__require__.o(exports, key)) {
            // Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
            exports[key] = definition[key]
          }
        }
      };
      
      (() => {
       __webpack__require__(0)
      })()
  `
}

const code = createBundleTemplate('./index.js')
console.log(code)
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
 *   __webpack__exports__map.sum = sum

 * }
 *
 * import sum from './sum.js' -> const sum = __webpack__require__(moduleId)
 *
 * console.log(sum)
 */



