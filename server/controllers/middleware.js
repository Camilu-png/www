require("dotenv").config();

const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          req.user = payload;
          next();
        } else {
          return res.status(400).json({ error: "token verification failed" });
        }
      } else {
        return res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      return res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  isLoggedIn,
};
