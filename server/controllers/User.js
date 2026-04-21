require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = Router();
const SECRET = process.env.SECRET || 'secret';

router.use(bodyParser.json());

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
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
