const path = require("path");
const express = require("express");
const handleCookieSessions = require("./middleware/handle-cookie-sessions");
const userRoutes = require("./routes/user-routes");
const messageRoutes = require("./routes/conversation-and-message-routes");

const logRoutes = require("./middleware/log-routes");

const app = express();
app.use(handleCookieSessions);
app.use(logRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", userRoutes);
app.use("/api", messageRoutes);

app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) next();
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
