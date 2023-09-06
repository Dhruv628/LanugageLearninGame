
const express = require("express");
const { CreateSession, GetAllUserSessions,GetAllSessions, GetSingleUserSessions } = require("../controllers/gameSessionController")

const router = express.Router();


router.post("/create",CreateSession);
router.get("/user/sessions",GetAllUserSessions);
router.get("/all/sessions",GetAllSessions);
router.get("/user/session/:id",GetSingleUserSessions);





module.exports=router;