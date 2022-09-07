const express = require("express");
const router = express.Router();
const { create,list, read, update,remove,changerole} = require('../Controller/Person');

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/person",auth,adminCheck,list);
router.get("/person/:id", read);
router.post("/person",  create);
router.put("/person/:id", update);
router.delete("/person/:id", remove);


router.post("/change-role",auth,adminCheck,changerole);
module.exports = router;