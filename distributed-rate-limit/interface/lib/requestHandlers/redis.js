import { RequestHandler } from "./base.js";
import redis from 'redis';
import fetch from "node-fetch";

const redisClient = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

await redisClient.connect();

redisClient.on("error", function(error) {
  console.error(error);
});

class RedisRequestHandler extends RequestHandler {
	async enqueue(request, response) {
		await redisClient.lPush("queue:tasks", request);
		this.runWorker();
		return response.status(202);
		
	}

	runWorker() {
		fetch(process.env.WORKER_FUNCTION_URL);
	}
}

export { RedisRequestHandler };