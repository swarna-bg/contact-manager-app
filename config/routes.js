const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../app/middleware/authenticate");

const usersController = require("../app/controllers/usersController");
const contactController = require("../app/controllers/contactControllers");

router.post("/users/register", usersController.register);
router.post("/users/login", usersController.login);
router.post("users/logout", authenticateUser, usersController.logout);

router.post("/contacts",authenticateUser, contactController.create);
router.get("/contacts", authenticateUser,contactController.list);
router.get("/contacts/:id", contactController.show);
router.delete("/contacts/:id", contactController.destroy);
router.put("/contacts/:id", contactController.update);

module.exports = router;
