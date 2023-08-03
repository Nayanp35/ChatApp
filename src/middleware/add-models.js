const User = require("../db/models/user");
const Conversation = require("../db/models/conversation");
const Message = require("../db/models/message");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Conversation,
    Message,
  };
  next();
};

module.exports = addModels;
