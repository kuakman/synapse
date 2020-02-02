/**
 * Project Package
 * @module utils.configuration
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import JSON5 from 'json5';
import fs from 'fs-extra';
import { resolve } from 'path';

export const load = () => {
	return JSON5.parse(fs.readFile());
};
