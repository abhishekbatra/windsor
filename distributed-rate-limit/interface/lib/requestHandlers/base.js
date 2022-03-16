class RequestHandler {
	handle(request, response) {
		// request: object
		return this.enqueue(request, response);
	}

	enqueue(_request, _response) {
		throw Error("NotImplemented");
	}
}

export {RequestHandler};