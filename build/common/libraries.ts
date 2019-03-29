/**
 * Bundle Third Party Libraries
 */
import colors from "colors";
import * as fs from "fs-extra";
import { OutputOptions, Plugin, rollup, RollupOptions } from "rollup";
import getBundles from "./bundles";
import { IConfiguration } from "./options";

const toJs = (file: string): string => {
	return file.replace(/\.(ts|tsx)$/, ".js");
};

const pathsExists = (...paths: string[]): boolean => {
	return paths.reduce((count: number, path: string) =>
		fs.pathExistsSync(path) ? ++count : count, 0) === paths.length;
};

const createOutput = (file: string, config: IConfiguration): OutputOptions => {
	return { ...config.output, file: toJs(file) };
};

const createPlugins = (config: IConfiguration): Plugin[] => {
	return config.plugins.map((plugin: any) => {
		return require(`rollup-plugin-${plugin.name}`)(plugin.options);
	});
};

const createBuilds = (config: IConfiguration): RollupOptions[] => {
	return config.targetLibs.map((lib: string, ix: number): RollupOptions => {
		return {
			input: config.sourceLibs[ix],
			output: createOutput(lib, config),
			plugins: createPlugins(config)
		};
	});
};

export const bundle = async (config: IConfiguration): Promise<any> => {
	if (pathsExists(...config.targetLibs)) return console.log(colors.green("Using existing Libraries..."));
	console.log(colors.yellow("Building Libraries..."));
	return await Promise.all(createBuilds(config).map(async (opts: RollupOptions) => {
		console.log(colors.cyan(`Building ${opts.output!.file}`));
		const build = await rollup(opts);
		await build.generate(opts.output!);
		await build.write(opts.output!);
		return getBundles(config.target, opts.output, build.cache.modules);
	}));
};
