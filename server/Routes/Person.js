const express = require("express");
const router = express.Router();
const { create,list, reads, update,remove,changestatus,changerole,userProf,Easylog,Hardlog,ChangeName,HardlogS,EastlogS} = require('../Controller/Person');
const {Reportadd,Rerecord,Rerecordlist} = require("../Controller/Reportlog")

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/person",auth,adminCheck,list);

router.get("/reads/:id",reads);

router.post("/person", create);
router.put("/person/:id",auth,adminCheck,update);
router.delete("/person/:id",auth,adminCheck,remove);


router.post("/change-status",auth,adminCheck,changestatus);
router.post("/change-role",auth,adminCheck,changerole);

router.post("/Easylog/:id",Easylog);
router.post("/Hardlog/:id",Hardlog);

router.post("/HardlogS/:id",HardlogS);
router.post("/EastlogS/:id",EastlogS);




router.put("/ChangeName/:id",auth,ChangeName);

router.post("/Reportadd/:id",Reportadd);

router.post("/Rerecord/:id",Rerecord);

router.post("/Rerecordlist/:id",Rerecordlist);


module.exports = router;