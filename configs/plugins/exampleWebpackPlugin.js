// 示例plugin
// 一个 JavaScript 命名函数或 JavaScript 类
class ExampleWebpackPlugin {
  // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
  apply(compiler) {
    // console.log('compiler', compiler);
    // 指定一个挂载到 webpack 自身的事件钩子。
    compiler.hooks.emit.tapAsync(
      'ExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('这是一个示例插件！');
        console.log(
          '这里表示了资源的单次构建的 `compilation` 对象：',
          compilation
        );

        // 用 webpack 提供的插件 API 处理构建过程
        // compilation.addModule(/* ... */);
        // 功能完成后调用 webpack 提供的回调
        callback();
      }
    )
  }
}

module.exports = ExampleWebpackPlugin;