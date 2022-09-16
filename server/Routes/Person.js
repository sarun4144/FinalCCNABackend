const express = require("express");
const router = express.Router();
const { create,list, read, update,remove,changestatus,changerole} = require('../Controller/Person');

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/person",auth,adminCheck,list);
router.get("/person/:id", read);
router.post("/person",  create);
router.put("/person/:id", update);
router.delete("/person/:id",auth,adminCheck,remove);


router.post("/change-status",auth,adminCheck,changestatus);
router.post("/change-role",auth,adminCheck,changerole);

module.exports = router;