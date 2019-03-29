
// import fs from 'fs';
import { resolve } from 'path';

const resolvePaths = (opts) => {
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

export const getServer = (opts) => {
	const { port, ...config } = opts.project.server;
	return { port, config };
};

export const getConfiguration = (opts) => {
	const { html, source, target, plugins, system } = opts.project;
	const environment = opts.project[opts.env];
	return Object.assign({
		cwd: opts.cwd,
		html,
		output: environment.output,
		plugins,
		source,
		sourceHtml: resolve(opts.cwd, source, html.path),
		sourceLibs: environment.libs.map((path) => resolve(opts.cwd, source, path)),
		target,
		targetHtml: resolve(opts.cwd, target, html.path),
		targetLibs: environment.libs.map((path) => resolve(opts.cwd, target, path)),
		system
	});
};

export default () => {};
