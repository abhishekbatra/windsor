import {CloudTasksClient} from '@google-cloud/tasks';

const client = new CloudTasksClient();

class TaskRescheduler {
	async createTask (
		project,
		queue,
		location,
		url,
		payload,
	) {
		const parent = client.queuePath(project, location, queue);
	
		// Convert message to buffer.
		const convertedPayload = JSON.stringify(payload);
		const body = Buffer.from(convertedPayload).toString('base64');
	
		const task = {
			httpRequest: {
				url,
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			},
		};
	
		task.scheduleTime = {
			seconds: 60,
		};
	
		try {
			// Send create task request.
			const [response] = await client.createTask({parent, task});
			console.log(`Created task ${response.name}`);
			return response.name;
		} catch (error) {
			console.error(Error(error.message));
		}
	}
}

export {TaskRescheduler};