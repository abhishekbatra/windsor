# Distributed Rate Limit Exercise

This codebase consists of a simple API server with one endpoint (`/`) and a rate limit of 1 request per second

To run the server, simply execute the correct script inside `api/bin/` based on your operating system. You can set the server's port by setting the `PORT` environment variable. The default port is 1337

For example: `PORT=8080 ./api/bin/server-macos`

You can also use the `api/test.sh` script to see the server in action

You don't need node.js installed locally to run this, however the node.js source code is provided for completeness.

The rest of this is up to you
