const express = require("express");
const router = express.Router();

//Controller

const {createImage,removeImage} = require("../Controller/CloudDinary")

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/image",createImage);
router.get("/removeimage",removeImage);


module.exports = router;