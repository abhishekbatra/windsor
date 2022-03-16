import { TaskRescheduler } from './rescheduleTask';

const redis = require('redis');

const redisClient = redis.createClient({
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD,
});

class Worker extends TaskHandler {
	async run(_task=null) {
		// task would normally not be null when real data is sent to API

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
		redisClient.lPop();
	}
	
	async rescheduleWorker() {
		const rescheduler = new TaskRescheduler();
		rescheduler.createTask(
			process.env.GOOGLE_CLOUD_PROJECT,
			process.env.QUEUE_NAME,
			process.env.QUEUE_LOCATION,
			process.env.FUNCTION_URL,
			process.env.SERVICE_ACCOUNT_EMAIL,
			payload,
		);
	}

	async handle(req, res) {
		const worker = new Worker();
		const workerResponse = worker.run(req, res);

		switch(workerResponse) {
			case 200:
				this.popQueue();
				return res.status(200);
			case 429:
				this.rescheduleWorker();
				return res.status(429);
			default:
				return res.status(500);
		}
	}
}

export {
	WorkerManagerRedis,
}