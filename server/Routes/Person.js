const express = require("express");
const router = express.Router();
const { create,list, reads, update,remove,changestatus,changerole,userProf,Easylog,Hardlog,ChangeName} = require('../Controller/Person');

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/person",auth,adminCheck,list);

router.get("/reads",auth,reads);

router.post("/person", create);
router.put("/person/:id",auth,adminCheck,update);
router.delete("/person/:id",auth,adminCheck,remove);


router.post("/change-status",auth,adminCheck,changestatus);
router.post("/change-role",auth,adminCheck,changerole);

router.post("/Easylog/:id",Easylog);
router.post("/Hardlog/:id",Hardlog);

router.put("/ChangeName/:id",ChangeName);

module.exports = router;