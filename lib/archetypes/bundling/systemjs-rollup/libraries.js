/**
 * Bundle Third Party Libraries
 */
import * as fs from 'fs-extra';
import { rollup } from 'rollup';
import getBundles from './bundles';

const toJs = (file) => {
	return file.replace(/\.(ts|tsx)$/, '.js');
};

const pathsExists = (...paths) => {
	return paths.reduce((count, path) =>
		fs.pathExistsSync(path) ? ++count : count, 0) === paths.length;
};

const createOutput = (file, config) => {
	return { ...config.output, file: toJs(file) };
};

const createPlugins = (config) => {
	return config.plugins.map((plugin) => {
		return require(`rollup-plugin-${plugin.name}`)(plugin.options);
	});
};

const createBuilds = (config) => {
	return config.targetLibs.map((lib, ix) => {
		return {
			input: config.sourceLibs[ix],
			output: createOutput(lib, config),
			plugins: createPlugins(config)
		};
	});
};

export const bundle = async (config) => {
	if (pathsExists(...config.targetLibs)) return console.log('Using existing Libraries...');
	return Promise.all(createBuilds(config).map(async (opts) => {
		const build = await rollup(opts);
		await build.generate(opts.output);
		await build.write(opts.output);
		return getBundles(config.target, opts.output, build.cache.modules);
	}));
};
