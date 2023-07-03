require("dotenv").config();
const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const router = Router();
const SECRET = process.env.SECRET || "secret";

router.use(bodyParser.json());

router.post("/patients", async (req, res) => {
  try {
    console.log(req.body)
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;