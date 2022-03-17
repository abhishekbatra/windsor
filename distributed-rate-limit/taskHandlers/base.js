class TaskHandler {
	handle(req) {

	}

	process(_apiResponse) {
		// Dummy work
		setTimeout(() => {
		}, Math.random() * (1000 * 3));
	}
}

export {TaskHandler};