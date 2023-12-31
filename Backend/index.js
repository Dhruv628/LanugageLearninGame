const express=require("express")
const connectToDB = require("./Db/db")
const port= process.env.PORT || 5000 
const userRoutes=require("./routes/userRoutes")
const gameRoutes=require("./routes/gameRoute")
const sessionRoute=require("./routes/gameSessionRoute")
const cors=require("cors")
const app=express()
app.use(cors());

app.use(express.json())
require('dotenv').config()

//Routes
app.use("/api/user",userRoutes)
app.use("/api/game",gameRoutes)
app.use("/api/session",sessionRoute)

app.listen(port,()=>{
    console.log(`Backend started succesfully at http://localhost:${port}`)
})

connectToDB();

