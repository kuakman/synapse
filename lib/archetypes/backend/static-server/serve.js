/**
 * Serve Task
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import micro from 'micro';
import handler from 'serve-handler';

export default (server) => {
	return micro(async (req, response) => handler(req, response, server)).listen(server.port);
};
