module.exports = {
	source: './src',
	target: './public',
	system: './js/system.config.js',
	server: {
		public: './public',
		rewrites: [
			{
				source: ':url',
				destination: 'html/:url.html'
			}
		],
		cleanUrls: true,
		port: 3000
	},
	plugins: [
		{
			name: 'includepaths',
			options: {
				include: {
					'systemjs': './node_modules/systemjs/dist/s.js'
				}
			}
		},
		{
			name: 'node-resolve',
			options: {
				module: true,
				jsnext: true,
				main: true,
				browser: true
			}
		},
		{
			name: 'commonjs',
			options: {
				include: 'node_modules/**'
			}
		}
	],
	html: {
		path: './html',
		srcExtension: '.nunjucks',
		outExtension: '.html'
	},
	test: {
		libs: [
			'js/libraries/libraries-test.ts',
			'js/libraries/libraries-dev.ts',
			'js/libraries/libraries-prod.ts'
		],
		output: {
			format: 'system'
		}
	},
	dev: {
		libs: [
			'js/libraries/libraries-dev.ts',
			'js/libraries/libraries-prod.ts'
		],
		output: {
			format: 'system'
		}
	},
	prod: {
		libs: [
			'js/libraries/libraries-prod.ts'
		],
		output: {
			format: 'system'
		}
	}
};
