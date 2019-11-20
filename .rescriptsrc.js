const not = fn => (...args) => !fn(...args)

const ruleIsOneOf = rule => Boolean(rule.oneOf)
const ruleIsNotOneOf = not(ruleIsOneOf)

const loaderIsFileLoader = rule => /file-loader/.test(rule.loader)
const loaderIsNotFileLoader = not(loaderIsFileLoader)

const logConfig = config => {
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
              exclude: fileLoaderRule.exclude.concat(/\.wasm$/)
            }
          ]
        }
      ]
    }
  }
};

logConfig.isMiddleware = true;

module.exports = [logConfig];
