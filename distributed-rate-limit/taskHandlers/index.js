const functions = require('@google-cloud/functions-framework');
const { TaskHandler } = require('./base');
const fetch = require('node-fetch');
const { WorkerManagerRedis } = require('./workers');

functions.http("worker", async (req, res) => {
	const workerManager = new WorkerManagerRedis();
	return (await worker.handle(req, res)).send();
});