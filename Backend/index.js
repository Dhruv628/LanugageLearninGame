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

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('Frontend/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'Frontend', 'build','index.html')));
  }

//Routes
app.use("/api/user",userRoutes)
app.use("/api/game",gameRoutes)
app.use("/api/session",sessionRoute)

app.listen(port,()=>{
    console.log(`Backend started succesfully at http://localhost:${port}`)
})
setTimeout(() => {
    connectToDB();
}, 300);
