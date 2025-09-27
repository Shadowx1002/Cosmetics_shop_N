import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productroutes.js";
import userRouter from "./routes/userRoutes.js";
import jwt from "jsonwebtoken";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({
          message: "Invalid token",
        });
      }
    });
  }else{
    next();
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    
  });
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


