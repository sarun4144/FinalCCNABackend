const express = require("express");
const router = express.Router();

//Controller
const {Imageadd,Imageremove} = require("../Controller/Exam")
const {createImage,removeImage} = require("../Controller/CloudDinary")

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.post("/images",auth,adminCheck ,createImage);
router.post("/removeimages",auth,adminCheck ,removeImage);

router.post("/Imageadd/:id",Imageadd);
router.post("/Imageremove",Imageremove);


module.exports = router;