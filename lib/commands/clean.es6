/**
 * Task Clean
 */
import _ from 'underscore';
import { dev } from '../utils/debug';

export const clean = (name, sub, options) => {
	dev('%s %o %o', name[0], sub, options);
	// return await Promise.all(config.targetLibs.map(fs.remove.bind(fs)))
	// .then(() => fs.remove(config.targetHtml))
	// .then(() => console.log(colors.yellow("Clean Directories")));
	// return _.extend(options, { clean: name[0] });
};
