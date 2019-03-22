/**
 * Dev Profile
 */
import { resolve } from "path";
import { getConfiguration, getServer, IConfiguration, IOptions } from "../options";

const commonPath = resolve("build", "common");

export const run = async (opts: IOptions) => {
	const config: IConfiguration = getConfiguration(opts);
	await require(resolve(commonPath, "clean")).run(config, opts)
		.then(() => require(resolve(commonPath, "libraries")).bundle(config, opts))
		.then(() => require(resolve(commonPath, "systemjs")).process(config, opts))
		.then(() => require(resolve(commonPath, "html")).compile(config, opts))
		.then(() => require(resolve(commonPath, "serve")).serve(getServer(opts)));
};
