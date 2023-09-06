
const express = require("express");
const { CreateUser, LoginUser, getUser} = require("../controllers/userController")
const isAuthenticatedUser=require("../middleware/auth");
const router = express.Router();

router.post("/signup",CreateUser)
router.post("/login",LoginUser)
router.get("/getuser",isAuthenticatedUser,getUser)



module.exports=router;