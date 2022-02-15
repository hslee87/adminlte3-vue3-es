var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { EnvironmentPlugin } = require('webpack')

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    publicPath: '/',
    // outputDir: '../public/',         // default : 'dist'
    assetsDir: 'assets',
    runtimeCompiler: true,
    devServer: {
        disableHostCheck: true,
        host: 'localhost',
        port: 8080
    },
    // configuration to use '@' for root path
    // src/path/to/filename.js ==> import from '@/path/to/filename'
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                src: path.resolve(__dirname, 'src')
            }
        },
        optimization: {
            minimize: false,
            splitChunks: {
                cacheGroups: {
                    // node_vendors: {
                    //     test: /[\\/]node_modules[\\/]/,
                    //     chunks: "all",
                    //     priority: 1
                    // },
                    // 'chunk-lte': {
                    //     test: /[\\/]node_modules\/admin-lte[\\/]/,
                    //     chunks: "all",
                    //     priority: 1
                    // }
                }
            }
        },
    },
    // chainWebpack: config => {
    //     config.plugin('copy').tap(([options]) => {
    //         options[0].ignore.push('AdminLTE-3/**/*')
    //         return [options]
    //     })
    // },
    pages: {
        index: {
            entry: 'src/main.js',       // entry for the page
            filename: 'index.html',         // output as dist/index.html
            templage: 'public/index.html',  // the source template
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            // title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        // subpage: 'src/subpage/main.js'
    }
}