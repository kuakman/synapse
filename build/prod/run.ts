/**
 * Production Profile
 */
import { resolve } from "path";
import { getConfiguration, IConfiguration, IOptions } from "../options";

const commonPath = resolve("..", "common");

export const run = (opts: IOptions) => {
	const config: IConfiguration = getConfiguration(opts);
	require(resolve(commonPath, "clean")).run(config, opts)
		.then(require(resolve(commonPath, "libraries")).bundle.bind(null, config, opts))
		.then(require(resolve(commonPath, "html")).compile.bind(null, config, opts))
		.then(require(resolve(commonPath, "serve")).serve.bind(null, config, opts));
};
