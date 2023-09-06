const mongoose=require("mongoose")

const connectToDB=async()=>{
        await mongoose.connect("mongodb+srv://languagegamebydhhruv:kOUEHhB5LA7GlZLn@cluster0.psoocji.mongodb.net/?retryWrites=true&w=majority")
        .then(
            console.log("Connected to Server")
            )
            .catch(error=>
                console.log("Error",error)
            )
}

module.exports=connectToDB;