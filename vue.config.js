
module.exports = {
    publicPath: './',
    productionSourceMap:false,
    lintOnSave: false,
    devServer: {
        hot: true,
        open: true,
        port:4455,
        // proxy: ip  // 龙群

        // proxy: {
        //     '/gcgj-web': {
        //         target: 'http://91gcgj.com/',   
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/gcgj-web': '/gcgj-web'
        //         }
        //     },
        //     '/gcgj-fdfs': {
        //       target: 'http://91gcgj.com/',
        //       ws: true,
        //       changeOrigin: true,
        //       pathRewrite: {
        //           '^/gcgj-fdfs': '/gcgj-fdfs'
        //       }
        //   },
        // }
    }
    
}

