// Assuming you have a user schema defined in ../models/userModel.js
const GameSession = require("../models/gameSessionModel");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken")
const secret="aniket"

//Create Session 
const CreateSession = async (req, res) => {
try {
const token=req.headers.token;
const decoded=await jwt.decode(token,secret)
const id=decoded.data;

const user = await User.findById(id).select("-password");

const session=req.body.session;

let easyScore=0;
let easyScored=0;
let intermediateScore=0;
let intermediateScored=0;
let advancedScore=0;
let advancedScored=0;

for(let i=0;i<session.length;i++){
    if(session[i].score===1){
        easyScore+=session[i].score;
        easyScored+=session[i].scored;
    }
    if(session[i].score===3){
        intermediateScore+=session[i].score;
        intermediateScored+=session[i].scored;
    }
    if(session[i].score===5){
        advancedScore+=session[i].score;
        advancedScored+=session[i].scored;
    }
}

const easy={
    score:easyScore,
   scored:easyScored,
   }

const intermediate={
    score:intermediateScore,
   scored:intermediateScored,
   }
const advanced={
    score:advancedScore,
   scored:advancedScored,
   }
   const score=easyScore+intermediateScore+advancedScore;
   const scored=easyScored+intermediateScored+advancedScored;

  const totalScored={
    score:score,
    scored:scored
  }
const totalScore={
    easy:easy,intermediate:intermediate,advanced:advanced,totalScored:totalScored
 }


const gameSession=await GameSession.create({
    session:session,
    user:user,
    totalScore:totalScore
})
return res.status(200).json({
    success:true,
    gameSession
})


} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
};

//Get all user Sessions
const GetAllUserSessions=async (req,res)=>{
    try {
        const token=req.headers.token;
        const decoded=await jwt.decode(token,secret)
        const id=decoded.data;
        const user = await User.findById(id).select("-password");

        const Sessions=await GameSession.find({
            "user.email":user.email
        })
     
        return res.status(200).json({
            success:true,
            total:Sessions.length,
            Sessions
        })
    }catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Get all user Sessions
const GetSingleUserSessions=async (req,res)=>{
    try {
        const gameid=req.params.id;
        const session=await GameSession.findOne({_id:gameid})
        return res.status(200).json({
            success:true,
            session
        })
    }catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Get all  Sessions
const GetAllSessions=async (req,res)=>{
    try {
        const Sessions=await GameSession.find()
        return res.status(200).json({
            success:true,
            total:Sessions.length,
            Sessions
        })
    }catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}





module.exports = {
    CreateSession,GetAllUserSessions,GetAllSessions,GetSingleUserSessions
};
