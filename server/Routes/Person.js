const express = require("express");
const router = express.Router();
const { create,list, read, update,remove,} = require('../Controller/Person');

// middleware
const { auth } = require('../Middleware/Auth')

router.get("/person",auth,list);
router.get("/person/:id", read);
router.post("/person",  create);
router.put("/person/:id", update);
router.delete("/person/:id", remove);

module.exports = router;