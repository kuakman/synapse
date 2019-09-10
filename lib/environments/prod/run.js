/**
 * Production Profile
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { resolve } from 'path';
import { getConfiguration, getServer } from '../common/options';

const commonPath = resolve('..', 'common');

export const run = async (opts) => {
	const config = getConfiguration(opts);
	await require(resolve(commonPath, 'clean')).run(config, opts)
		.then(() => require(resolve(commonPath, 'libraries')).bundle(config, opts))
		.then(() => require(resolve(commonPath, 'systemjs')).process(config, opts))
		.then(() => require(resolve(commonPath, 'html')).compile(config, opts))
		.then(() => require(resolve(commonPath, 'serve')).serve(getServer(opts)));
};
