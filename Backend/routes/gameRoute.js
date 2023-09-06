
const express = require("express");
const { createQuestion,GetAllQuestions,DeleteAQuestion,UpdateAQuestion} = require("../controllers/gameController")
const fetchuserRole=require("../middleware/fetchuserRole")
const router = express.Router();


router.post("/create",fetchuserRole,createQuestion)
router.get("/get",GetAllQuestions)
router.delete("/delete/:id",fetchuserRole,DeleteAQuestion)
router.put("/update/:id",fetchuserRole,UpdateAQuestion)




module.exports=router;