const express = require("express");
const dotenv = require("dotenv");
const users = require("../model/userModel");
const arr = require("../mock_data/data");
const cloudinary = require("cloudinary").v2;

const router = express.Router();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

router.get("/users", async (req, res) => {
  try {
    const user = await users.find();
    if (user.length) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      });
      res.status(200).json(user);
    } else {
      res.status(404).json({
        status: "failed",
      });
    }
  } catch (e) {}
});

router.post("/users", async (req, res) => {
  //console.log(req.body);
  //console.log(req.files);
  try {
    const user = await users.find();
    if (!user.length) {
      await users.create(arr);
    } else {
      const file = req.files.photo;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (!err) {
          const newUser = await users.create({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            PostImage: result.url,
          });

          res.status(200).json(newUser);
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
