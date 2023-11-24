import express from "express";
import User from "../models/User.model.js";
const router = express.Router();

//save a news
router.post("/save", async (req, res) => {
  const { user, news } = req.body;
  console.log(req.body)
  const userFound = await User.findOne({ email: user.email });
  if (userFound) {
    userFound.saved_news.push(news);
    await userFound.save();
    return res.json({
      success: true,
      message: "saved successfully",
      data: userFound,
    });
  } else {
    return res.json({
      success: false,
      message: "failed successfully",
    });
  }
});

export default router;
