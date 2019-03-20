/**
 * Bundle Third Party Libraries
 */
import colors from "colors";
import * as fs from "fs-extra";
import { RollupOptions } from "rollup";
import { IConfiguration } from "../options";

const pathsExists = (...paths: string[]): boolean => {
	return paths.reduce((count: number, path: string) =>
		fs.pathExistsSync(path) ? ++count : count, 0) === paths.length;
};

const createBuilds = (config: IConfiguration): RollupOptions[] => {
	return config.targetLibs.map((lib: string): RollupOptions => {
		console.log(lib, config);
		return {} as RollupOptions;
	});
};

export const bundle = async (config: IConfiguration): Promise<any> => {
	if (pathsExists(...config.targetLibs)) return console.log(colors.green("Using existing Libraries..."));
	console.log(colors.yellow("Building Libraries..."));
	return await createBuilds(config);
	// return await Promise.all(createBuilds(config).map(rollup));
};
