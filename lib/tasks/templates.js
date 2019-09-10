/**
 * Html Templates
 */
import * as fs from 'fs-extra';
import globby from 'globby';
import { Environment, FileSystemLoader } from 'nunjucks';
import { resolve } from 'path';

const readDir = (config) => {
	const pattern = resolve(config.sourceHtml, `**/!(_)*${config.html.srcExtension}`);
	return globby.sync(pattern, { nodir: true });
};

const read = async (input, env, opts) => {
	return env.renderString(fs.readFileSync(input).toString(), opts);
};

const write = async (outputFile, content) => {
	fs.outputFileSync(outputFile, content);
	return outputFile;
};

const process = async (inputFile, env, config, opts) => {
	const outputFile = resolve(config.targetHtml, inputFile
		.replace(`${config.sourceHtml}/`, '')
		.replace(config.html.srcExtension, config.html.outExtension));
	const input = await read(inputFile, env, opts);
	return write(outputFile, input);
};

export const compile = async (config, opts) => {
	const loader = new FileSystemLoader(config.sourceHtml, { watch: false, noCache: false });
	const env = new Environment(loader, { trimBlocks: true, lstripBlocks: true });
	return Promise.all(readDir(config).map((file) => process(file, env, config, opts)));
};
