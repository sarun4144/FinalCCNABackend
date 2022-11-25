const express = require("express");
const router = express.Router();
const { examadd,listexam,currentExamChoices,examChoicesAdd,examChoicesChange,examChoicesDelete,examReset,examChoicesAddChoice,examChoicesDeleteChoice,
examHeadChange,CorrectAnswer
,Easyrecord,Hardrecord,CountStamp,removeExam} = require("../Controller/Exam");
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/listexam",listexam);
router.post("/examadd",auth,adminCheck,examadd);
router.post("/current-exam/:id",currentExamChoices);
router.post("/examchoicesadd/:id",examChoicesAdd);
router.post("/examChoiceschange/:id",examChoicesChange);
router.post("/examChoicesdelete/:id",examChoicesDelete);
router.post("/examChoicesAddChoice/:id",examChoicesAddChoice);
router.post("/examChoicesDeleteChoice/:id",examChoicesDeleteChoice);
router.post("/examReset/:id",examReset);
router.post("/examHeadChange/:id",examHeadChange);
router.post("/CorrectAnswer/:id",CorrectAnswer);

router.post("/Easyrecord/:id",Easyrecord);
router.post("/Hardrecord/:id",Hardrecord);

router.post("/CountStamp/:id",CountStamp);

router.delete("/removeExam/:id",removeExam);



module.exports = router;