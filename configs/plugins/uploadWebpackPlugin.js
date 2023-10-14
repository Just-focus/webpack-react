// 上传插件

class UploadWebpackPlugin {
  constructor(options) {
    // 在构造函数中可以接收插件的配置选项
    this.options = options || {};
  }

  // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('UploadWebpackPlugin', (compilation, callback) => {
      console.log('这是一个上传插件！');
      // 上传sourcemap文件
      this.uploadSourcemap(compilation, () => {
        console.log('Sourcemap上传完成');
        callback(); // 完成后调用Webpack提供的回调
      });
    });
  }

  uploadSourcemap(compilation, callback) {
    // 获取构建输出的目录
    const outputDirectory = compilation.getPath(this.options.outputPath);
    console.log('outputDirectory', outputDirectory);
    callback();
  }
}

module.exports = UploadWebpackPlugin;