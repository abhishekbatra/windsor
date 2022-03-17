import 'dotenv/config';
import { RedisRequestHandler } from './lib/requestHandlers/redis.js';

const service = async (req, res) => {
	const requestJson = req.body;
	const requestHandler = new RedisRequestHandler();
	// TODO: handler instantiation can be through a factory
	return (await requestHandler.handle(requestJson, res)).send();
};

export { service };