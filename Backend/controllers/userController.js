// Assuming you have a user schema defined in ../models/userModel.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "aniket";

//REGISTER user 
const CreateUser = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    else{
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass
      });
      //Very Important format
      const authtoken = jwt.sign({ data: user.id }, secret, {
        expiresIn: 120 * 60,
      });
  
      if (!user) {
        return res.json({
          message: "Error creating user",
          success: false,
        });
      }
      res.json({
        user,
        authToken: authtoken,
        success: true,
      });
    }
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//LOGIN user 
const LoginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }
    else{
      const providedPassword = req.body.password;
      const storedPassword = existingUser.password;
      let verify=false;
      const verified = await bcrypt.compare(providedPassword, storedPassword).then(
        res=>verify=res
      )
      if (!verify) {
        return res.json({
          message: "Incorrect password",
          success: false,
        });
      }
      else{
        const authtoken = jwt.sign({ data: existingUser.id }, secret, {
          expiresIn: 120 * 60,
        });
        const user=await User.findOne({email}).select("-password");
       
       return res.json({
          user,
          success: true,
          authtoken,
        });
      }
   
    }
    
  } catch (error) {
   return res.json({
      success: false,
      message: error.message,
    });
  }
};

//GET USER DETAILS
const getUser = async (req, res) => {
  try {
    const id = await jwt.decode(req.headers.token, secret);
    const userId = id.data;
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      res.status(400).json({ message: "User not found", success: false });
    }
    res.json({
      user,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};


//PLAYING A GAME 
const playGame=async(req,res)=>{
  
}


module.exports = {
  CreateUser,
  LoginUser,
  getUser
};
