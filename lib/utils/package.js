/**
 * Package Json Utilities
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import JSON5 from 'json5';
import fs from 'fs-extra';
import { resolve } from 'path';

export default JSON5.parse(fs.readFileSync(resolve(process.cwd(), 'package.json')));
