import bcrypt from "bcrypt";
import crypto from "crypto";
import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import nodemailer from "nodemailer";
import passport from "passport";
import auth from "../middleware/auth.js";
import User from "../models/User.model.js";

dotenv.config();
const router = express.Router();

//sign up or login
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { credentials } = req.body;
  const { email, picture, name, sub: id } = jwtDecode(credentials.credential);
  const data = await User.findOne({ email });
  if (data) {
    console.log("user exists");
    res.json({
      success: true,
      message: "User already exists!",
      data,
    });
  } else {
    try {
      const user = new User({
        id: parseInt(id),
        email,
        name,
        picture,
      });
      const data = await user.save();
      console.log(data);
      return res.json({ success: true, message: "User created in DB!", data });
    } catch (error) {
      console.log("user sign up failed", error);
    }
  }
});



//log out
router.get("/signout", async (req, res) => {
  return res.cookie("jwt", "").json({
    success: true,
    message: "Logout Success!",
  });
});








export default router;
