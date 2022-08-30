const express = require("express");
const router = express.Router();
const { create,list, read, update,remove,} = require('../Controller/Person');

// middleware
const { auth } = require('../Middleware/Auth')

router.get("/person",auth,list);
router.get("/person/:id", auth,read);
router.post("/person",  auth,create);
router.put("/person/:id", auth,update);
router.delete("/person/:id", auth,remove);

module.exports = router;