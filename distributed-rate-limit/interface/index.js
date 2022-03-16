require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { GCPRequestHandler } = require('./lib/requestHandlers/gcp');

const app = express();
app.use(bodyParser.json())

const port = parseInt(process.env.PORT || "1337");

app.get("/", (req, res) => {
	const requestJson = req.body;
	const gcpHandler = new GCPRequestHandler();
	// TODO: handler instantiation can be through a factory
	return gcpHandler.handle(requestJson).send();
});

app.get("/handle-task", (req, res) => {
	
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});