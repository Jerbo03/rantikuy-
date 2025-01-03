const express = require("express");
const router = express.Router();

const {createUser, getAllUsers, getUserById}
    = require("../controllers/userController");
const {updateUserById, deleteUserById}
    = require("../controllers/userController");

// routers
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

module.exports = router;