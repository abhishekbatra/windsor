const {CloudTasksClient} = require('@google-cloud/tasks');
const client = new CloudTasksClient();

class TaskRescheduler {
	createTask (
		project, // Your GCP Project id
		queue, // Name of your Queue
		location, // The GCP region of your queue
		url, // The full url path that the request will be sent to
		email, // Cloud IAM service account
		payload, // The task HTTP request body
	) {
		// Construct the fully qualified queue name.
		const parent = client.queuePath(project, location, queue);
	
		// Convert message to buffer.
		const convertedPayload = JSON.stringify(payload);
		const body = Buffer.from(convertedPayload).toString('base64');
	
		const task = {
			httpRequest: {
				httpMethod: 'GET',
				url,
				oidcToken: {
					serviceAccountEmail: email,
					audience: new URL(url).origin,
				},
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			},
		};
	
		task.scheduleTime = {
			seconds: 0,
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