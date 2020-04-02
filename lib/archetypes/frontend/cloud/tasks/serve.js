/**
 * Serve Task
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import micro from 'micro';
import handler from 'serve-handler';

export const serve = (server) => {
	return micro(async (req, response) => handler(req, response, server.config)).listen(server.port);
};
