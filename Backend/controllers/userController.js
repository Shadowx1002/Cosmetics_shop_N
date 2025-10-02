import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
