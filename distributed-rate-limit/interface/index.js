require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { RedisRequestHandler } = require('./lib/requestHandlers/redis');

const app = express();
app.use(bodyParser.json())

const port = parseInt(process.env.PORT || "1338");

app.get("/", async (req, res) => {
	const requestJson = req.body;
	const requestHandler = new RedisRequestHandler();
	// TODO: handler instantiation can be through a factory
	return await requestHandler.handle(requestJson).send();
});

app.get("/handle-task", (req, res) => {
	
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});