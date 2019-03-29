/**
 * Server
 */
import colors from "colors";
import { IncomingMessage, ServerResponse } from "http";
import micro from "micro";
import { Server } from "net";
import handler from "serve-handler";
import { IServer } from "./options";

export const serve = (server: IServer): Server => {
	console.log(colors.yellow(`Serving on [${server.port}]...`));
	return micro(async (req: IncomingMessage, response: ServerResponse): Promise<void> => {
		await handler(req, response, server.config);
	}).listen(server.port);
};
