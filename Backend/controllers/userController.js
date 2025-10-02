import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
dotenv.config();
import OTP from "../models/otp.js";

export function createUser(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedPassword,
    role: req.body.role,
  });

  user
    .save()
    .then(() => {
      res.json({ message: "User added successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in adding user", error: err });
    });
}

export function getUsers(req, res) {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching users", error: err });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🚫 Block login if user is blocked
    if (user.isBlocked) {
      return res
        .status(403)
        .json({ message: "Your account is blocked. Contact admin." });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_TOKEN
      );
      res.status(200).json({
        message: "Login successful",
        user: user,
        token: token,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  });
}

// ✅ Toggle Block/Unblock user
export async function toggleBlockUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked; // switch true/false
    await user.save();

    res.json({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }
  if (req.user.role != "admin") {
    return false;
  }
  return true;
}
export async function LoginWithGoogle(req, res) {
  const token = req.body.accessToken;
  if (!token) {
    return res.status(400).json({ message: "Access Token Required" });
  }

  // Get user info from Google
  const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const existingUser = await User.findOne({ email: response.data.email });

  let finalUser;
  if (!existingUser) {
    // Create new user
    const newUser = new User({
      email: response.data.email,
      firstname: response.data.given_name,
      lastname: response.data.family_name,
      password: "googleUser",
      img: response.data.picture,
    });
    finalUser = await newUser.save();
  } else {
    finalUser = existingUser;
  }

  // Generate JWT
  const jwtToken = jwt.sign(
    {
      email: finalUser.email,
      userId: finalUser._id,
      role: finalUser.role,
    },
    process.env.JWT_TOKEN
  );

  res.json({
    message: "Login Successfully",
    token: jwtToken,
    role: finalUser.role,
  });
}
const transport=nodemailer.createTransport({
  service:'gmail',
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth:{
    user:"nirodakumarasingha@gmail.com",
    pass:process.env.GLP
  }
})
export async function sendOtp(req,res){
    const randomOTP=Math.floor(100000+Math.random()*900000);
    const email=req.body.email;
    if(email==null){
      res.status(400).json({
        message:"Email is Required"
      })
      return;
    }
    const user=await User.findOne({
      email:email
    })
    if(user==null){
      res.status(404).json({
        message:"User Not Found"
      })
    }
    //delete all otps
    await OTP.deleteMany({
      email:email 
    })
    const message={
      from:"nirodakumarasingha@gmail.com",
      to:email,
      subject:"resetting password for Nero Cosmetics",
      text:"This is your password reset OTP :" +randomOTP
    }

    const otp=new OTP({
      email:email,
      otp:randomOTP
    })
    await otp.save()
    transport.sendMail(message,(error,info)=>{
      if(error){
         res.status(500).json({
        message:"Failed to send OTP",
        error:error
      })
      }else{
        res.json({
        message:"OTP send successfully",
        otp:randomOTP
      })
      }
    })
}
export async function resetPassword(req,res){
  const otp=req.body.otp
  const email=req.body.email
  const newPassword=req.body.newPassword
  


  const response=await OTP.findOne({
    email:email
  })
  if(response==null){
    res.status(404).json({
      message:"No OTP request found Please Try againg"
    })
    return;
  }
  if(otp==response.otp){
    await OTP.deleteMany(
      {email:email}
    )
    const hashedPassword=bcrypt.hashSync(newPassword,10)
    const response2=await User.updateOne(
     {email:email},
      {
        password:hashedPassword
        

      }
    )
    res.json({
      message:"Password has been reset successfully"

    })

  }else{
    res.status(403).json({
      message:"OTP  Incorrect"
    })
  }
}