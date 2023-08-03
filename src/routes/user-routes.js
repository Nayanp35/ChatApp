const express = require("express");
const userController = require("../controllers/user");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.get("/users", userController.list);
Router.post("/users", userController.create);
Router.get("/users/:id", userController.show);
Router.post("/login", userController.login);
Router.get("/me", userController.showMe);
Router.delete("/logout", userController.logout);

module.exports = Router;
