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
  traverse(ast, {
    ImportDeclaration(item) {
      const { node } = item
      const { name } = node.specifiers[0].imported
      const depPath = path.resolve(__dirname, node.source.value)
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
