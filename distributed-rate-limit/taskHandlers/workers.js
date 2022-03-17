import { TaskHandler } from './base.js';
import { TaskRescheduler } from './rescheduleTask.js';
import fetch from 'node-fetch';

import redis from 'redis';

const redisClient = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

await redisClient.connect();

class Worker extends TaskHandler {
	async run(_taskPayload) {
		const apiResponse = await fetch(process.env.API_URL);
		switch (apiResponse.status) {
			case 200:
				this.process(apiResponse);
				return 200;
			case 429:
				return 429;
			default:
				return 500;				
		}
	}
}

class WorkerManagerRedis extends TaskHandler {
	async popQueue() {
		redisClient.rPop("queue:tasks");
	}
	
	async rescheduleWorker(taskPayload) {
		const rescheduler = new TaskRescheduler();
		rescheduler.createTask(
			process.env.GOOGLE_CLOUD_PROJECT,
			process.env.QUEUE_NAME,
			process.env.QUEUE_LOCATION,
			process.env.FUNCTION_URL,
			taskPayload,
		);
	}

	async handle(req, res) {
		const worker = new Worker();
		const taskPayload = redisClient.lRange("queue:tasks", -1, -1);
		const workerResponse = worker.run(taskPayload);

		switch(workerResponse) {
			case 200:
				this.popQueue();
				return res.status(200);
			case 429:
				this.rescheduleWorker(taskPayload);
				return res.status(429);
			default:
				return res.status(500);
		}
	}
}

export {
	WorkerManagerRedis,
}