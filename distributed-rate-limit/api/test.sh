#!/bin/sh

set -euo pipefail

echo "This test script demonstrates the server in action"

PORT=${PORT:-1337}

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  BINARY="./bin/server-linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  BINARY="./bin/server-macos"
elif [[ "$OSTYPE" == "cygwin" ]]; then
  BINARY="./bin/server-win.exe"
elif [[ "$OSTYPE" == "msys" ]]; then
  BINARY="./bin/server-win.exe"
elif [[ "$OSTYPE" == "win32" ]]; then
  BINARY="./bin/server-win.exe"
else
  # Unknown.
  echo "Unknown OS: $OSTYPE"
  echo "Please update test.sh to run the server manually using node.js"
  exit 1
fi

$BINARY &
# Comment the previous line and uncomment this if you want to run the server using node instead
# node ./index.js
PID=$!

echo "Waiting 5 seconds so the server has enough time to start"
sleep 5

echo "Sending 6 requests with 1 second delay between each"
for i in {1..6}; do
  curl "http://localhost:$PORT/"
  echo
  sleep 1
done
echo
echo "All responses above should say OK"
echo

echo "Sending 6 requests with 300 millisecond delay between each"
for i in {1..6}; do
  curl "http://localhost:$PORT/"
  echo
  sleep 0.3
done
echo
echo "Some responses above should say OK, and others should be rate limited"
echo

echo "Killing server"

kill $PID
