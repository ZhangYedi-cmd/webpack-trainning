const fs = require('fs')
const path = require('path')
const {parse} = require('@babel/parser')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

// import { sum } from "./sum.js" --> const sum = __require__('./sum.js')

const defaultCode = `
 import { sum } from "./sum.js";
`

const ast = parse(defaultCode, {
  sourceType: "module"
})

// Identifier --> MemberExpression
traverse(ast, {
  ImportDeclaration(item) {
    const { node } = item
    const depPath = path.resolve(__dirname, node.source.value)
    item.replaceWith(
      t.variableDeclaration(
        'const',
        [
          t.variableDeclarator(
            t.identifier("res"),
            t.callExpression(
              t.identifier(`__webpack__require__`),
              [t.identifier('path')]
            )
          )
        ]
      )
    )
  },
})

const { code } = generate(ast)
console.log(code)
