// 删除babel
module.exports = function ({ types: t }) {
  console.log('types', t);

  return {
    visitor: {
      Identifier(path) {
        // 转换DEBUG
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.name === "DEBUG";

        if (isDebug && parentNodeIsIfStatement) {
          const stringNode = t.stringLiteral("DEBUG");
          path.replaceWith(stringNode);
        }
      },

      StringLiteral(path) {
        // 删除DEBUG
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.value === "DEBUG";

        if (isDebug && parentNodeIsIfStatement) {
          if (process.env.NODE_ENV === "production") {
            path.parentPath.remove();
          }
        }
      },
    },
  };
};