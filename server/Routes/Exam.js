const express = require("express");
const router = express.Router();
const { examadd,listexam,currentExamChoices,examChoicesAdd,} = require("../Controller/Exam");
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/listexam",listexam);
router.post("/examadd",examadd);
router.post("/current-exam/:id",currentExamChoices);
router.post("/examchoicesadd/:id",examChoicesAdd);



module.exports = router;