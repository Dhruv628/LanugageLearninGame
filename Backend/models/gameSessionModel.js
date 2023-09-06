const mongoose=require("mongoose")

const gameSessionSchama=new mongoose.Schema({
  session: [
    {
      type: Object,
      trim: true,
      required:true
    },
  ],
  user:{
    type:Object,
    required:true
  },
  totalScore:{
    easy:{
      score:{
        type:Number,
      },
     scored:{
      type:Number,
     }
    },
    intermediate:{
      score:{
        type:Number,
      },
     scored:{
      type:Number,
     }
    },
    advanced:{
      score:{
        type:Number,
      },
     scored:{
      type:Number,
     }
    },
    totalScored:{
      score:{
        type:Number,
      },
      scored:{
        type:Number
      }
    }
  },
  date:{
    type:Date,
    default:Date.now()
}
})

const GameSession = mongoose.model("GameSession", gameSessionSchama);
module.exports = GameSession;
