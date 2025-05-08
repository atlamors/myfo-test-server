import { Router, Request, Response } from 'express';
import { generateToken } from '@middleware/auth';
import bcrypt from 'bcrypt';

const router = Router();

// Simulate a user database with hashed passwords
const users = [
    { 
        userId: '12345', 
        email: 'user@example.com', 
        password: '$2b$10$o.nRqFLJOKAWIBKTORKwNuTPBelHkIDHSKPfLclaJ/c4uLmTGaL5u', // password: password123
        role: 'user' 
    }
];

// POST login - generate JWT token for testing
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    
    // Validate user
    if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
    }

    // Validate password using bcrypt.compare
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
    }

    // Generate token for the authenticated user
    const token = generateToken({
        userId: user.userId,
        email: user.email,
        role: user.role
    });

    res.json({
        token,
        expiresIn: 3600, // 1 hour
        user: {
            userId: user.userId,
            email: user.email,
            role: user.role
        }
    });
});

export default router; 