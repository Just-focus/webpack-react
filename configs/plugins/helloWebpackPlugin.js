// 监控全部打包完成

class HelloWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('HelloWebpackPlugin', (Stats) => {
      console.log('HelloWebpackPlugin', Stats);
    })
  }
}

module.exports = HelloWebpackPlugin;
