/**
 * SystemJs
 */
import colors from "colors";
import deepExtend from "deep-extend";
import * as fs from "fs-extra";
import json5 from "json5";
import { resolve } from "path";
import { IConfiguration } from "./options";

const openPattern: string = "SystemJS.config(";
const closePattern: string = ")";

const read = (content: string): JSON => {
	const start: number = content.indexOf(openPattern);
	const end: number = content.lastIndexOf(closePattern);
	return json5.parse(content.toString().substring(start + openPattern.length, end));
};

const decorate = (existing: JSON, ...systemConfigs: JSON[]): JSON => {
	return systemConfigs.reduce((memo: JSON, config: JSON) => deepExtend(memo, config), existing);
};

const write = (target: string, content: string, config: JSON): void => {
	let out = content.substring(0, content.indexOf(openPattern) + openPattern.length);
	out += json5.stringify(config, null, 2);
	out += closePattern + ";";
	fs.writeFileSync(target, out);
};

export const process = async (config: IConfiguration, systemConfigs: JSON[]): Promise<void> => {
	console.log(colors.yellow("Writing SystemJs Configuration..."));
	const content: string = fs.readFileSync(resolve(config.source, config.system)).toString();
	const target = resolve(config.target, config.system);
	return await write(target, content, decorate(read(content), ...systemConfigs));
};
