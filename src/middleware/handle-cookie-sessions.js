const express = require("express");
const cookieSession = require("cookie-session");

const router = express.Router();

router.use(
  cookieSession({
    secret: process.env.SESSION_SECRET,
  })
);

module.exports = router;
