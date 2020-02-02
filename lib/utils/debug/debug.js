/**
 * Debug Wrapper
 * @module utils.debug
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import debug from 'debug';

const logger = debug('synapse');
logger.log = console.log.bind(console);

export const err = logger.extend('error');
export const warn = logger.extend('warn');
export const test = logger.extend('test');
export const dev = logger.extend('dev');
