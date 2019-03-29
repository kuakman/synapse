/**
 * Debug Wrapper
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import debug from 'debug';
export default debug(`synapse:${process.env.SYNAPSE_ENV || 'prod'}`);
