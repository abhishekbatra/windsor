const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
const port = parseInt(process.env.PORT || "1337");

app.use(
  rateLimit({
    windowMs: 10000, // 10 seconds
    max: 10,
    // Enforce a global rate limit across all API consumers
    keyGenerator: (_) => "global",
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: false,
  })
);

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("OK");
  }, Math.random() * (1000 * 3)); // 0-3 seconds
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
