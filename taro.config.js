module.exports = {
  webpackChain(chain, webpack) {
    chain.plugin('mini-css-extract-plugin').use(require.resolve('mini-css-extract-plugin'), [{
      ignoreOrder: true,
    }]);
  },
};