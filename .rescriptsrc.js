const path = require("path")
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")

const not = fn => (...args) => !fn(...args)

const ruleIsOneOf = rule => Boolean(rule.oneOf)
const ruleIsNotOneOf = not(ruleIsOneOf)

const loaderIsFileLoader = rule => /file-loader/.test(rule.loader)
const loaderIsNotFileLoader = not(loaderIsFileLoader)

const excludeWasm = config => {
  const ruleWithOneOf = config.module.rules.find(ruleIsOneOf)
  const fileLoaderRule = ruleWithOneOf.oneOf.find(loaderIsFileLoader)

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.filter(ruleIsNotOneOf),
        {
          oneOf: [
            ...ruleWithOneOf.oneOf.filter(loaderIsNotFileLoader),
            {
              ...fileLoaderRule,
              exclude: fileLoaderRule.exclude.concat(/\.wasm$/),
            },
          ],
        },
      ],
    },
  }
}

excludeWasm.isMiddleware = true

const addWasmpPlugin = config => {
  const watchDirectories = [
    path.resolve(__dirname, "src/MandelbrotSet/infrastructure/MandelbrotSetWasm/rust"),
  ]

  const wasmPackPlugin = new WasmPackPlugin({
    crateDirectory: __dirname,
    outDir: "src/MandelbrotSet/infrastructure/MandelbrotSetWasm/pkg",
    watchDirectories,
  })

  wasmPackPlugin.watchDirectories = watchDirectories

  return {
    ...config,
    plugins: [...config.plugins, wasmPackPlugin],
  }
}

addWasmpPlugin.isMiddleware = true

module.exports = [excludeWasm, addWasmpPlugin]
