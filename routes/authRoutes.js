const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ nama, email, password: hashedPassword, role });

    res.status(201).json({ message: `User ${role} berhasil dibuat`, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'rahasiaJWT', { expiresIn: '1h' });

    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

module.exports = router;
