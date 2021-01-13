const path = require('path');
const glob = require('glob');
// const config = require('./public/prod-config.js');
const CompressionPlugin = require("compression-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// console.log(UglifyJsPlugin)

require('events').EventEmitter.defaultMaxListeners = 0;

// let _config = new config({
//     'process_env_NODE_ENV': process.env.NODE_ENV,
// });

function resolve(dir) {
    return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target:'http://52.82.87.90:8089', // 测试用科伦
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        }
    },
    publicPath: './', // 服务器部署版本
    publicPath: './', // dist 本地开发测试版本
    productionSourceMap: false,

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            // 生成 gzip 压缩文件
            config.plugins.push(
                new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: "gzip",
                    test: /\.(js|css)(\?.*)?$/i,
                    threshold: 102400,
                    minRatio: 0.8,
                })
            );

        } else {
            // 为开发环境修改配置...

        }
    },

    runtimeCompiler: true,
    outputDir: 'dist',
    // pwa: {
    //     name: "pwa-test12",
    //     themeColor: '#abcdef',
    //     iconPaths: {
    //         favicon32: 'favicon.ico',
    //         favicon16: 'favicon.ico',
    //         appleTouchIcon: 'favicon.ico',
    //         maskIcon: 'favicon.ico',

    //     }

    // },

    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.module
                .rule('images')
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                    bypassOnDebug: true,
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                })
                .end();

        } else {
            // 为开发环境修改配置...

        }

        // 添加别名
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .end();

    },
    css: {
        sourceMap: process.env.NODE_ENV == 'development' ? true : false
    }
}