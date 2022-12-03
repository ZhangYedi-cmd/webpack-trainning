const swc = require('@swc/core')

const parseCode = async () => {
  const module = await swc.parse(
    "const a = 1",
    {
      syntax: "ecmascript", // "ecmascript" | "typescript"
      comments: false,
      script: true,
      target: "es2015",
      isModule: false,
    })
  console.log(module.body)
  const {code} = await swc.print(
    module,
    {
      module: {
        type: "commonjs",
      },
    });
  console.log(code)
}


parseCode()
