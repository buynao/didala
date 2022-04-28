const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CheckerPlugin } = require('awesome-typescript-loader');


const PATH_NODE_MODULES = path.resolve(__dirname, 'node_modules');
var ROOT = path.resolve(__dirname);

const env = process.env.NODE_ENV;

const isDev = env === 'dev';

console.log(`当前环境:${env}`);

const packConfig = {
    // 入口文件
    entry: {
        vender: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'redux-thunk',
        ],
        lib: [path.resolve(__dirname, 'src/app.tsx')],
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    // 模块加载器
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                loader: "awesome-typescript-loader",
                exclude: [PATH_NODE_MODULES]
            },
            {
                enforce: "pre",
                test: /\.ts[x]$/,
                loader: "source-map-loader",
                exclude: [PATH_NODE_MODULES]
            },
            // 编译打包jsx
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"]
                    }
                },
                exclude: [PATH_NODE_MODULES],
            },
            // 编译打包css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
                exclude: [PATH_NODE_MODULES],
            },
            // less文件编译
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 'postcss-loader', {
                            loader: 'less-loader'
                        },
                    ],
                }),
            },
            // 图片转化，小于8k自动转化成base64编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name:'images/[name].[ext]', //图片名称
                },
            },
        ],
    },
    resolve: {
        // import时省略的扩展名
        extensions: ['.js', '.jsx', '.json', ".ts", ".tsx", ".png"],
        alias: {
            '@': path.join(__dirname, './src'),
            '@icons':  `${__dirname}/src/component/Icon`,
            '@TYPES':  `${__dirname}/src/types/`,
            '@actions':  `${__dirname}/src/actions/`,
            "@comp": `${__dirname}/src/component/`,
            "@epics": `${__dirname}/src/epics/`,
            "@imgs": `${__dirname}/src/imgs/`,
            "@operator": `${__dirname}/src/operator/`,
            "@pages": `${__dirname}/src/pages/`,
            "@reducers": `${__dirname}/src/reducers/`,
            "@router": `${__dirname}/src/router/`,
            "@util": `${__dirname}/src/util/`,
            "@services": `${__dirname}/src/services/`,
        },
    },
    // // 不进行打包的库
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    //     axios: 'axios',
    // },
    // 插件
    plugins: [
        new BundleAnalyzerPlugin({        
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: pkg.title,
            filename: 'index.html',
            template: 'index.html',
        }),
        new ExtractTextPlugin('base.css'),
    ],
    devServer: {
        disableHostCheck: true,
    },
};
console.log(isDev);
// 开发与调试环境
if (isDev) {
    // 开发与调试才打包map文件
    packConfig.devtool = '#source-map';
    packConfig.output.filename = `[name].min.js`;
} else {
    packConfig.mode = 'production'
    packConfig.output.filename = `[name].min.[hash].js`;
}

module.exports = packConfig;
