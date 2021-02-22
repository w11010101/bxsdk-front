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
                // target: 'http://52.82.87.90:8089', // 测试用科伦
                target: 'https://wx.5ifapiao.com/bxsdk3thMgt', // 标品测试接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '报销SDK',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    // publicPath: './', // 服务器部署版本
    publicPath: './', // dist 本地开发测试版本
    assetsDir: './',
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
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            // config.module
            //     .rule('images')
            //     .use('image-webpack-loader')
            //     .loader('image-webpack-loader')
            //     .options({
            //         bypassOnDebug: true,
            //         mozjpeg: {
            //             progressive: true,
            //             quality: 65
            //         },
            //         optipng: {
            //             enabled: false,
            //         },
            //         pngquant: {
            //             quality: [0.65, 0.90],
            //             speed: 4
            //         },
            //         gifsicle: {
            //             interlaced: false,
            //         },
            //         webp: {
            //             quality: 75
            //         }
            //     })
            //     .end();

        } else {
            // 为开发环境修改配置...

        }
        // config.module
        //     .rule('less')
        // //     .test(/\.less$/i)
        //     // .use('style-loader')
        //     .use('less-loader')
        //     // .tap(options => {
        //     //     console.log(option)
        //     //     // 修改它的选项...
        //     //     return options.lessOptions = {
        //     //         strictMath: true,
        //     //     }
        //     // })

        // 添加别名
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .end()


    },
    css: {
        sourceMap: process.env.NODE_ENV == 'development' ? true : false,
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        // 'text-color': '#111',
                        'border-color': 'red',
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "src/common/css/mobile.less";`,
                    },
                },
            },
        }
    }
}