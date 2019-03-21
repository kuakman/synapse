/**
 * Serve Handler Type Definition
 */
declare module "serve-handler" {
	import { IncomingMessage, ServerResponse } from "http";
	import { Server } from "net";

	export type ServeHeader = {
		source: string;
		headers: object[];
	};

	export type ServeSourceDestination = {
		source: string;
		destination: string;
	};

	export type ServeConfiguration = {
		public: string;
		cleanUrls?: boolean | string[];
		rewrites?: ServeSourceDestination[];
		redirects?: ServeSourceDestination[];
		headers?: ServeHeader[];
		directoryListing?: string[];
		unlisted?: string[];
		trailingSlash?: boolean;
		renderSingle?: boolean;
	};

	export default function handler(
		req: IncomingMessage,
		res: ServerResponse,
		config?: ServeConfiguration,
		methods?: any
	): Server;
}
