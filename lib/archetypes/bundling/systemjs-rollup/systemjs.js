/**
 * SystemJs
 */
import deepExtend from 'deep-extend';
import * as fs from 'fs-extra';
import json5 from 'json5';
import { resolve } from 'path';

const openPattern = 'SystemJS.config(';
const closePattern = ')';

const read = (content) => {
	const start = content.indexOf(openPattern);
	const end = content.lastIndexOf(closePattern);
	return json5.parse(content.toString().substring(start + openPattern.length, end));
};

const decorate = (existing, ...systemConfigs) => {
	return systemConfigs.reduce((memo, config) => deepExtend(memo, config), existing);
};

const write = (target, content, config) => {
	let out = content.substring(0, content.indexOf(openPattern) + openPattern.length);
	out += json5.stringify(config, null, 2);
	out += closePattern + ';';
	fs.writeFileSync(target, out);
};

export const process = async (config, systemConfigs) => {
	const content = fs.readFileSync(resolve(config.source, config.system)).toString();
	const target = resolve(config.target, config.system);
	return write(target, content, decorate(read(content), ...systemConfigs));
};
