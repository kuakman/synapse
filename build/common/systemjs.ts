/**
 * SystemJs
 */
import colors from "colors";
import { IConfiguration } from "../options";

const read = (): Buffer | void => {
	return;
};

const inject = (): string | void => {
	return;
};

const write = (): void => {
	return;
};

export const orocess = async (bundles: any, config: IConfiguration): Promise<void> => {
	console.log(colors.yellow("Writing SystemJs Configuration..."));
	console.log(bundles);
	// TODO:
	// 1. Read system.config.js
	// 2. Inject Bundles for the given environment
	// 3. Write out system.config.js to target public/js
	return;
};
