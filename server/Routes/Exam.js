const express = require("express");
const router = express.Router();
const { examadd,listexam} = require("../Controller/Exam");
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/listexam",listexam);
router.post("/examadd",examadd);


module.exports = router;