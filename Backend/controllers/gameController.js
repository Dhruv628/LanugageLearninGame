const Game=require("../models/gameModel")


//Create a Questions -- admin
const createQuestion=async (req,res)=>{
    try {
        
        const q=req.body.question;
        const options=req.body.options;
        const answer=req.body.answer;

        const existingGame=await Game.findOne({question:q})
        if(existingGame){
            return res.status(400).json({
                success:false,
                message:"Question already exits"
            })
        }
        else{
        
            const difficulty=req.body.difficulty
            const language=req.body.language
            const score=req.body.score
            const game = await Game.create({
                   question:q,
                   options:options,        
                   answer:answer, 
                  difficulty:difficulty,
                  language:language,
                  score:score
            })
    
           return res.status(200).json({
                success:true,
                game
            })
        }
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Create a Questions -- admin
const GetAllQuestions=async (req,res)=>{
    try {
        
     const questions=await Game.find();
     return res.status(200).json({
       success:true,
       total:questions.length,
       questions,
     })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//Create a Questions -- admin
const DeleteAQuestion=async (req,res)=>{
    try {
     const id=req.params.id
     await Game.findByIdAndRemove(id)
     return res.status(200).json({
       success:true,
       message:"deleted" 
     })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Update a Questions -- admin
const UpdateAQuestion=async (req,res)=>{
    try {
     const id=req.params.id;
     const q=req.body.question;
     const options=req.body.options;
     const answer=req.body.answer;
     const difficulty=req.body.difficulty;
     const language=req.body.language;
     const score=req.body.score;

    await Game.findByIdAndUpdate(id,{ question:q,
       options:options,        
        answer:answer, 
       difficulty:difficulty,
       language:language,
       score:score})

    const updatedGame=await Game.findById(id)
     return res.status(200).json({
       success:true,
       updatedGame 
     })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
   createQuestion,GetAllQuestions,DeleteAQuestion,UpdateAQuestion
  };
  