# Distributed Rate Limit Exercise

This codebase consists of a simple API server with one endpoint (`/`) and a rate limit of 1 request per second

To run the server, simply execute the correct script inside `api/bin/` based on your operating system. You can set the server's port by setting the `PORT` environment variable. The default port is 1337

For example: `PORT=8080 ./api/bin/server-macos`

You can also use the `api/test.sh` script to see the server in action

You don't need node.js installed locally to run this, however the node.js source code is provided for completeness.

The rest of this is up to you

# Solution instructions

## Deploy on cloud (recommended)
1. Update variables in interface/.env.yaml and interface/.env.yaml. Samples:
```
# interface/.env.yaml
REDIS_HOST: "<instance>.cloud.redislabs.com"
REDIS_PORT: "14476"
WORKER_FUNCTION_URL: "https://<region>-<project-id>.cloudfunctions.net/drl-worker"
GOOGLE_CLOUD_PROJECT: "<project-id>"
QUEUE_NAME: "<queue-name>"
```

```
# taskHandlers/.env.yaml
REDIS_HOST: "<instance>.cloud.redislabs.com"
REDIS_PORT: "14476"
WORKER_FUNCTION_URL: "https://<region>-<project-id>.cloudfunctions.net/drl-worker"
GOOGLE_CLOUD_PROJECT: "<project-id>"
QUEUE_NAME: "<queue-name>"
API_URL: "https://<project-id>.uc.r.appspot.com"
```

2. gcloud tasks queues create drl-queue --location "us-central1"

3. ```
	cd taskHandlers 
	gcloud functions deploy drl-worker --entry-point worker --runtime nodejs14 --trigger-http --env-vars-file .env.yaml
	```	
4. ```
	cd interface
	gcloud functions deploy drl-service --entry-point service --runtime nodejs14 --trigger-http --env-vars-file .env.yaml
	```
5. ```
	cd api
	gcloud app deploy
	```

	
## Run locally
1. docker run -p 6379:6379 --name drl-redis -d redis redis-server --save 60 1 --loglevel warning
2. gcloud tasks queues create drl-queue --location "us-central1"
3. cd interface; npx @google-cloud/functions-framework --target=service --port 8081
4. cd taskHandlers; npx @google-cloud/functions-framework --target=worker --port 8080
