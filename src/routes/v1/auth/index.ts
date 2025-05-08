import { Router, Request, Response } from 'express';
import { generateToken } from '@middleware/auth';

const router = Router();

// POST login - generate JWT token for testing
router.post('/login', (req: Request, res: Response) => {

    // Log the request object
    console.log(`req: ${req}`);

    // In a real app, we would validate credentials

    // For testing purposes, we'll just generate a token
    const token = generateToken({
        userId: '12345',
        email: 'test@example.com',
        role: 'user'
    });

    res.json({
        token,
        expiresIn: 3600, // 1 hour
        user: {
            userId: '12345',
            email: 'test@example.com',
            role: 'user'
        }
    });
});

export default router; 