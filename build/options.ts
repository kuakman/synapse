import args from "args";
import fs from "fs";
import { resolve } from "path";
import { OutputOptions } from "rollup";
import { ServeConfiguration } from "serve-handler";

export interface IOptions {
	[key: string]: any;
	clean: string;
	env: string;
	cwd: string;
}

export interface IConfiguration {
	source: string;
	target: string;
	plugins: any;
	sourceHtml: string;
	targetHtml: string;
	sourceLibs: string[];
	targetLibs: string[];
	output: OutputOptions;
}

export interface IServer {
	config: ServeConfiguration;
	port: number;
}

const getPackage = () => {
	const file = fs.readFileSync(resolve(process.cwd(), "package.json"));
	return JSON.parse(file.toString());
};

const decorate = (options: any): IOptions => {
	return { ...options, ...resolvePaths(getPackage()), cwd: process.cwd() };
};

const resolvePaths = (opts: IOptions): IOptions => {
	const project = opts.project;
	return Object.assign(opts, {
		cwd: process.cwd(),
		project: {
			...opts.project,
			source: resolve(process.cwd(), project.source),
			target: resolve(process.cwd(), project.target)
		}
	});
};

export const getServer = (opts: IOptions): IServer => {
	const { port, ...config } = opts.project.server;
	return { port, config } as IServer;
};

export const getConfiguration = (opts: IOptions): IConfiguration => {
	const { html, source, target, plugins } = opts.project;
	const environment = opts.project[opts.env];
	return Object.assign({ output: environment.output, source, target, plugins }, {
		sourceHtml: resolve(opts.cwd, source, html.pattern + html.srcExtension),
		sourceLibs: environment.libs.map((path: string) => resolve(opts.cwd, source, path)),
		targetHtml: resolve(opts.cwd, source, html.pattern + html.outExtension),
		targetLibs: environment.libs.map((path: string) => resolve(opts.cwd, target, path))
	});
};

export default (): IOptions => {
	return decorate(args
		.option("env", "The environment on which the build process will run.", "dev")
		.option("clean", "Flag that cleans directories and bundle builds.", false)
		.parse(process.argv));
};
