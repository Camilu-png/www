require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = Router();
const SECRET = process.env.SECRET || 'secret';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

router.use(bodyParser.json());

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, type });
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!validateEmail(username)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await User.findOne({ email: username });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const token = jwt.sign({ username: user.username, type: user.type }, SECRET, { expiresIn: '24h' });
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      name: user.name,
      email: user.email,
      type: user.type
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
