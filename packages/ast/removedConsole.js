/**
 * 如何去除代码中的console.log()
 *
 * code ------> ast --------> ast ----------> code
 *      parse      transform      generator
 */

const defaultCode = `
  console.log(" this is default format code ")
  function f1 () {
     console.log("this is f1")
  }
`

// 通过babel操作AST
const f1 = () => {
  const {parse} = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const generate = require('@babel/generator').default
  // code --> ast
  const ast = parse(defaultCode);
  // ast --> ast
  traverse(ast, {
    ExpressionStatement(item) {
      const {node} = item
      if (node.expression.callee.object.name === 'console' && node.expression.callee.property.name === 'log') {
        item.remove()
      }
    }
  })
  // ast --> code
  const {code} = generate(ast)

  return code
}

// acorn-walk 遍历AST，识别到console语句后直接替换代码
const f2 = () => {
  // code --> ast
  const acorn = require('acorn');
  // ast --> ast
  const walk = require('acorn-walk');
  const ast = acorn.parse(defaultCode, {ecmaVersion: 2020})
  const MagicString = require('magic-string');
  const code = new MagicString(defaultCode);

  walk.simple(ast, {
    ExpressionStatement(node) {
      code.overwrite(node.start, node.end, '')
    }
  })

  return code
}



