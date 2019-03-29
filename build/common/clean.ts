/**
 * Clean
 */
import colors from "colors";
import * as fs from "fs-extra";
import { IConfiguration, IOptions } from "./options";

export const run = async (config: IConfiguration, opts: IOptions): Promise<void> => {
	if (opts.clean) {
		return await Promise.all(config.targetLibs.map(fs.remove.bind(fs)))
			.then(() => fs.remove(config.targetHtml))
			.then(() => console.log(colors.yellow("Clean Directories")));
	}
};
