import express, { Request, Response, NextFunction } from 'express';
import authenticate from '../middleware/auth';

interface AuthRequest extends Request {
    user?: { id: string };
}

const router = express.Router();

router.get('/dashboard', authenticate, (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(403).json({ error: 'Unauthorized access' });
        return;
    }
    res.json({ message: `Welcome to the dashboard, ${req.user.id}` });
});

export default router;
