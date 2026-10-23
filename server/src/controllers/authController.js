import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { StayzyRepo } from '../repositories/stayzyRepo.js';
import { JWT_SECRET } from '../middleware/auth.js';

export async function register(req, res, next) {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required fields.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    const existing = await StayzyRepo.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const user = await StayzyRepo.createUser({ name, email, password, role, phone });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user,
      message: 'Account created successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const userRecord = await StayzyRepo.findUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const match = await bcrypt.compare(password, userRecord.password_hash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email, role: userRecord.role, name: userRecord.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Record login timestamp in database
    await StayzyRepo.updateLastLogin(userRecord.id);

    const { password_hash, ...safeUser } = userRecord;

    res.json({
      success: true,
      token,
      user: safeUser,
      message: 'Logged in successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    const user = await StayzyRepo.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.json({ success: true, message: 'Logged out successfully.' });
}
