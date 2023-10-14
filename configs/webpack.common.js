// 基础配置
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const paths = require('./paths');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		app: paths.resolvePath('src/app.tsx'),
	},
	output: {
		filename: '[name].[contenthash].js',
		path: paths.resolvePath('dist'),
		publicPath: isDevelopment ? '/' : '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: () => ({
								before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
							}),
							transpileOnly: true,
						},
					},
					// 为提高性能，摒弃了传统的 ts-loader，选择最新的 esbuild-loader
					// {
					// 	loader: 'esbuild-loader',
					// 	options: {
					// 		loader: 'tsx',
					// 		target: 'es2015',
					// 	},
					// }
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					// for production use MiniCssExtractPlugin to compile styles as separate files, for development add them directly into the HTML
					// 用于将 CSS 插入到 DOM 中，通过使用多个 自动把 styles 插入到 DOM 中 | 将 JS 字符串生成为 style 节点
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					// 对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样，让 CSS 也能模块化开发 | 将 CSS 转化成 CommonJS 模块
					'css-loader',
					paths.resolvePath('configs/loaders/cssLoader'),
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							// additionalData: `@import "@zerico/react/dist/styles/variables.scss";`,
						},
					},
				],
			},
			{
				test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
				include: paths.resolvePath('src'),
				type: 'asset/resource',
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
				include: paths.resolvePath('src'),
				type: 'asset',
			},
			{
				test: /\.wasm$/,
				include: paths.resolvePath('src'),
				type: 'webassembly/experimental',
			},
		],
	},
	plugins: [
		new ESLintPlugin({
			context: paths.resolvePath('src'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: paths.resolvePath('src/index.html'),
			inject: true,
		}),
		new ForkTsCheckWebpackPlugin(),
		isDevelopment && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	resolve: {
		// 后缀名自动补全 默认值 ['.js', '.json', '.wasm']
		extensions: ['...', '.tsx', '.ts', '.jsx', '.scss', '.css'],
		alias: {
			'@': paths.resolvePath('src'),
		},
	},
};
