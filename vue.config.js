'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // 网址标题
const port = defaultSettings.port // 端口配置

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    // hash 模式下可使用
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    /**
     * publicPath设置的就是域名根目录到项目文件根目录间的url。
     * publicPath 接收 string 类型的 value；默认值为 '/'（/是根目录）
     * publicPath 设置的是部署应用包的基本 URL，不是项目打包出来的文件存放的位置。
     * publicPath 也可以设置为''或者'./'，设置成相对路径后可以任意部署。
     **/
    publicPath: '/',
    // 设置项目打包生成的文件的存储目录，可以是静态路径也可以是相对路径。
    // 注意：相对路径是相对于项目文件当前的根路径。
    outputDir: 'dist',
    // 设置放置打包生成的静态资源 (js、css、img、fonts) 的目录.
    // 注意： 该目录是相对于 outputDir 。
    assetsDir: 'static',
    // 设置是否在开发环境下每次保存代码时都启用 eslint验证。
    /**
     * false：关闭 elsint 检测
     * true：开启每次保存都进行检测，效果与warning一样
     * 'warning'：开启每次保存都进行检测，lint 报错信息将显示到控制台命令行，编译并不会失败。
     * 'default'：开启每次保存都进行检测，lint 报错信息将显示到浏览器页面上，且编译失败。
     * 'error'：开启每次保存都进行检测，lint 报错信息以及警告信息将显示到浏览器页面上，且编译失败。
     */
    lintOnSave: process.env.NODE_ENV === 'development',
    // 设置生产环境的 source map 开启与关闭。
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
        }
    },
    // 借助 configureWebpack我们可以实现随webpack配置的新增与修改。
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            // 别名配置
            alias: {
                '@': resolve('src'),
                // '@crud': resolve('src/components/Crud')
            }
        }
    },
    // Webpack配置另一种写法—— webpack-chain（链式操作）。
    /*chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.runtimeChunk('single')
                }
            )
    },*/
    /*transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]*/
}
