const express = require("express");
const router = express.Router();
const { register, login } = require("../Controller/Auth");

router.post("/register", register);

router.post("/login", login);


module.exports = router;