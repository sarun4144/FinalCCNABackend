const express = require("express");
const router = express.Router();
const { examadd,listexam,currentExamChoices,examChoicesAdd,examChoicesChange,examChoicesDelete,examReset,examChoicesAddChoice,examChoicesDeleteChoice} = require("../Controller/Exam");
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/listexam",listexam);
router.post("/examadd",examadd);
router.post("/current-exam/:id",currentExamChoices);
router.post("/examchoicesadd/:id",examChoicesAdd);
router.post("/examChoiceschange/:id",examChoicesChange);
router.post("/examChoicesdelete/:id",examChoicesDelete);
router.post("/examChoicesAddChoice/:id",examChoicesAddChoice);
router.post("/examChoicesDeleteChoice/:id",examChoicesDeleteChoice);
router.post("/examReset/:id",examReset);



module.exports = router;