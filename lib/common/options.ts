import args from "args";
import fs from "fs";
import { resolve } from "path";
import { OutputOptions } from "rollup";
import { ServeConfiguration } from "serve-handler";

type HTML = {
	path: string;
	outExtension: string;
	srcExtension: string;
};

export interface IOptions {
	[key: string]: any;
	clean: string;
	env: string;
	cwd: string;
}

export interface IConfiguration {
	cwd: string;
	source: string;
	target: string;
	plugins: any;
	html: HTML;
	sourceHtml: string;
	targetHtml: string;
	sourceLibs: string[];
	targetLibs: string[];
	output: OutputOptions;
	system: string;
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
	const { html, source, target, plugins, system } = opts.project;
	const environment = opts.project[opts.env];
	return Object.assign({
		cwd: opts.cwd,
		html,
		output: environment.output,
		plugins,
		source,
		sourceHtml: resolve(opts.cwd, source, html.path),
		sourceLibs: environment.libs.map((path: string) => resolve(opts.cwd, source, path)),
		target,
		targetHtml: resolve(opts.cwd, target, html.path),
		targetLibs: environment.libs.map((path: string) => resolve(opts.cwd, target, path)),
		system
	});
};

export default (): IOptions => {
	return decorate(args
		.option("env", "The environment on which the build process will run.", "dev")
		.option("clean", "Flag that cleans directories and bundle builds.", false)
		.parse(process.argv));
};
