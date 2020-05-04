/**
 * Express and Nunjucks Setup
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import express from 'express';
import { configure } from 'nunjucks';

export default (config) => {
	const { templates } = config;
	const app = express(), env = configure('views', { ...templates.envOptions, express: app });
	return { env, app };
};
