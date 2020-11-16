
const path = require('path');

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  // productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 8084, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://devpfm.firstcare.com.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
  }
  
  },
   pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './assets/utils'),
      ],
    },
  },

}
