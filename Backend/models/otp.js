import mongoose from "mongoose";

const OTPSchema=mongoose.Schema({
    email: {
    type: String,
    required: true,
    
  },
  otp: {
    type: Number,
    required: true
    
  }
})
const OTP = mongoose.model("OTP" , OTPSchema)
export default OTP;