// 异步 Loader
// 获取 webpack 的 loader 上下文 --> 可以返回一个 Promise 或调用 this.async() 函数来通知 Webpack 框架
// const loaderCallback = this.async();

// 错误处理 -> this.emitError()

// map -> 表示转换的映射关系
// meta -> 用于提供有关源文件的元信息
module.exports = function (source) {
  // 使用正则表达式将 "old-class" 替换为 "new-class"
  console.log('source', source);
  // const modifiedSource = source.replace(/\.old-class/g, '.new-class');

  return source;
};