import 'dotenv/config'
import {WorkerManagerRedis} from './workers.js';

const worker = async (req, res) => {
	const workerManager = new WorkerManagerRedis();
	return (await workerManager.handle(req, res)).send();
};

export {worker};