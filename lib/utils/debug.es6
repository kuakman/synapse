/**
 * Debug Wrapper
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import debug from 'debug';

export const log = debug('synapse');
export const error = log.extend('error');
export const test = log.extend('test');
export const dev = log.extend('dev');
