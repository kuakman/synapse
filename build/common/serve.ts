/**
 * Server
 */
import { IncomingMessage, ServerResponse } from "http";
import micro from "micro";
import { Server } from "net";
import handler from "serve-handler";
import { IServer } from "../options";

export default (server: IServer): Server => {
	return micro(async (req: IncomingMessage, response: ServerResponse): Promise<void> => {
		await handler(req, response, server.config);
	}).listen(server.port);
};
