const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
	context: __dirname,
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		// Needed to compile multiline strings in Cesium
		sourcePrefix: ''
	},
	amd: {
		// Enable webpack-friendly use of require in Cesium
		toUrlUndefined: true
	},
	node: {
		// Resolve node module use of fs
		fs: 'empty'
	},
	module: {
	  rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
          }]
	},
	plugins: [
        	new HtmlWebpackPlugin({
		template: 'src/index.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist")
	},
	resolve: {
		alias: {
			// Cesium module name
			cesium: path.resolve(__dirname, cesiumSource)
		}
	}
};

