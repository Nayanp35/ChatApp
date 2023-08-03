const express = require("express");
const conversationController = require("../controllers/conversation");
const messageController = require("../controllers/message");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.get("/conversation/:id", conversationController.listById);
Router.post("/conversation", conversationController.createConversation);

Router.get("/messages/:id", messageController.listByConversationId);
Router.post("/message", messageController.createMessage);
Router.get("/lastMessage/:receiverId", messageController.lastMessage);

module.exports = Router;
