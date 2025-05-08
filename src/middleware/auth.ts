import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@utils/logger';

// Define the JWT payload interface
export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

// Extend Express Request interface to include authenticated user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Authentication token is required' });
            return;
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            res.status(400).json({ error: 'Invalid token format' });
            return;
        }

        // Verify the token
        const jwtSecret = process.env.JWT_SECRET; // Use environment variable for secret
        if (!jwtSecret) {
            logger.error('JWT secret is not defined');
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        // Add the user information to the request
        req.user = decoded;

        next();
    } catch (error) {
        logger.error('JWT Authentication error:', error);

        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ error: 'Token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                res.status(400).json({ error: 'Invalid token' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// Generate a JWT token for testing
export const generateToken = (payload: JwtPayload): string => {
    const jwtSecret = process.env.JWT_SECRET; // Use environment variable for secret
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined');
    }
    return jwt.sign(payload, jwtSecret, { expiresIn: '15m' }); // Short expiration time
}; 