/**
 * Test Profile
 */
import { resolve } from "path";
import {getConfiguration, IConfiguration, IOptions} from "../options";

const commonPath = resolve("..", "common");

export const run = async (opts: IOptions) => {
	const config: IConfiguration = getConfiguration(opts);
	await require(resolve(commonPath, "clean")).run(config, opts)
		.then(() => require(resolve(commonPath, "libraries")).bundle(config, opts))
		.then(() => require(resolve(commonPath, "systemjs")).process(config, opts))
		.then(() => require(resolve(commonPath, "html")).compile(config, opts))
		.then(() => require(resolve(commonPath, "test")).run(config, opts));
};
