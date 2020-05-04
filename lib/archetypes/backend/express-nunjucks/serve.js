/**
 * Serve Script
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import express from 'express';

export default (config) => {
	const { server, app } = config;
	app.use(express.static(server.public, server.static));
	return app.listen();
};
