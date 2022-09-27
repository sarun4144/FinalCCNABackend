const express = require("express");
const router = express.Router();
const { create,list, read, update,remove} = require('../Controller/Category');

// middleware
const { auth,adminCheck } = require('../Middleware/Auth')

router.get("/category",list);
router.get("/category/:id",auth,adminCheck,read);
router.post("/category",auth,adminCheck,create);
router.put("/category/:id",auth,adminCheck,update);
router.delete("/category/:id",auth,adminCheck,remove);


module.exports = router;