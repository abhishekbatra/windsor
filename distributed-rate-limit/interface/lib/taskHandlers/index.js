const functions = require('@google-cloud/functions-framework');
const { TaskHandler } = require('./base');
const fetch = require('node-fetch');

class Worker extends TaskHandler {
	async handle(_req, res) {
		const apiResponse = await fetch(API_URL);
		switch (apiResponse.status) {
			case 200:
				this.process(apiResponse);
				return res.status(200);
				break;
			case 429:
				return res.status(429);
				break;
			default:
				return res.status(500);				
		}
	}
}

functions.http("worker", async (req, res) => {
	const worker = new Worker();
	return (await worker.handle(req, res)).send();
});