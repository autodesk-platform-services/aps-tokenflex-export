module.exports = {
  outputDir: "./www/",
  pages: {
    index: {
      title: "Consumption Report - APS TokenFlex",
      entry: "./client/src/main.js",
      template: "./client/public/index.html",
      filename: "index.html",
    },
  },
  productionSourceMap: false,
};
