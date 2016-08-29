'use strict';

var webpack = require('webpack');
var path = require('path');

var appSettings = path.join(__dirname, 'src/js/settings/settings-local.js');

module.exports = {
	cache: true,
	entry: {
		local: './src/js',
	},
	devtool: '#inline-source-map',
	output: {
		path: __dirname + '/development/assets/js',
		filename: '[name].min.js',
		publicPath: __dirname + '/development/assets/js',
		pathinfo: true
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extentions: ['', '.js'],
		alias: {
			appSettings: appSettings,
		}
	},

	module: {
		noParse: [
		],
		loaders: [
			{   test: /\.js$/, 
				loader: 'babel',
				include: [
					__dirname + '/src/js'
				], 
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			}
		]
	},
	plugins: []
};

