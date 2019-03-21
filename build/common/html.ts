/**
 * Html Templates
 */
import colors from "colors";
import * as fs from "fs-extra";
import glob from "glob";
import { Environment, FileSystemLoader } from "nunjucks";
import { resolve } from "path";
import { IConfiguration, IOptions } from "../options";

const readDir = (config: IConfiguration) => {
	const pattern: string = resolve(config.sourceHtml, `**/!(_)*${config.html.srcExtension}`);
	return glob.sync(pattern, { nodir: true });
};

const read = async (input: string, env: Environment, opts: IOptions): Promise<string> => {
	return env.renderString(fs.readFileSync(input).toString(), opts);
};

const write = async (outputFile: string, content: string): Promise<string> => {
	fs.outputFileSync(outputFile, content);
	return outputFile;
};

const process = async (
	inputFile: string,
	env: Environment,
	config: IConfiguration,
	opts: IOptions
): Promise<string> => {
	const outputFile = resolve(config.targetHtml, inputFile
		.replace(`${config.sourceHtml}/`, "")
		.replace(config.html.srcExtension, config.html.outExtension));
	const input: string = await read(inputFile, env, opts);
	return write(outputFile, input);
};

export const compile = async (config: IConfiguration, opts: IOptions): Promise<string[]> => {
	console.log(colors.yellow("Compiling Nunjucks Templates..."));
	const loader: FileSystemLoader = new FileSystemLoader(config.sourceHtml, { watch: false, noCache: false });
	const env: Environment = new Environment(loader, { trimBlocks: true, lstripBlocks: true });
	return await Promise.all(readDir(config).map((file: string) => process(file, env, config, opts)));
};
