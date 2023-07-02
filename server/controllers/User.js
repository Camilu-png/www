require("dotenv").config();
const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const router = Router();
const SECRET = process.env.SECRET || "secret";

User.create({
  name: "admin",
  password: "admin",
  email: "admin@email.com",
  type: "admin",
});

User.create({
  name: "zimi",
  password: "zimi",
  email: "zimi@email.com",
  type: "doctor",
});

router.use(bodyParser.json());

router.post("/signup", async (req, res) => {
  try {
    res.json(await User.create(req.body));
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
