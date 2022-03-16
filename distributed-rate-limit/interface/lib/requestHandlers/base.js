class RequestHandler {
	async handle(request, response) {
		// request: object
		return await this.enqueue(request, response);
	}

	async enqueue(_request, _response) {
		throw Error("NotImplemented");
	}
}

export {RequestHandler};