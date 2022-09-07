const express = require("express");
const router = express.Router();
const { examadd,listexam,examchoice} = require("../Controller/Exam");
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/listexam",listexam);
router.post("/examadd", examadd);
router.post("/examchoice", examchoice);

module.exports = router;