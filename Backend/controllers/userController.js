import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function createUser(req, res) {
  const hashedPassowrd = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedPassowrd,
    role: req.body.role,
  });

  user
    .save()
    .then(() => {
      res.json({ message: "User added successfully" });
    })
    .catch(() => {
      res.json({ message: "Error in adding user" });
    });
}

export function getUsers(req, res) {
  User.find().then((data) => {
    res.json(data);
  });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
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
        res
          .status(200)
          .json({
            message: "Login successful",
            user: user,
            token: token,
            role: user.role,
          });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    }
  });
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
