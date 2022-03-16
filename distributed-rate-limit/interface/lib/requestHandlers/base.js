class RequestHandler {
	handle(request) {
		// request: object
		return this.enqueue(request);
	}

	enqueue(request) {
		throw Error("NotImplemented");
	}
}

export {RequestHandler};