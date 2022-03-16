import { RequestHandler } from "./base";
const redis = require('redis');

const redisClient = redis.createClient({
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
});

class RedisRequestHandler extends RequestHandler {
	async enqueue(request, response) {
		await redisClient.lPush("queue:tasks", request);
		this.runWorker();
		return response.status(202);
		
	}

	runWorker() {
		// TODO: run cf
	}
}

export {RedisRequestHandler};