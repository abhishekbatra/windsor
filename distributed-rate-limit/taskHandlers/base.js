class TaskHandler {
	handle(req) {

	}

	process(_apiResponse) {
		// Dummy work
		setTimeout(() => {
			res.send("OK");
		}, Math.random() * (1000 * 3));
	}
}

export {TaskHandler};