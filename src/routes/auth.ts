import express from 'express';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import User, { IUser } from '../models/User';
import { logout } from '../controllers/authController';
const router = express.Router();

// Register Route
router.post('/register', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ error: 'Email already registered' });
        return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser.id);
    res.status(201).json({ message: 'User registered successfully', token });
}));

// Login Route
router.post('/login', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', token });
}));
router.post('/logout', logout);
export default router;
