import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@config';
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
      res.status(401).json({ error: 'Invalid token format' });
      return;
    }

    // Verify the token
    const jwtSecret = config.jwtSecret || 'your-secret-key'; // Fallback for development
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    
    // Add the user information to the request
    req.user = decoded;
    
    next();
  } catch (error) {
    logger.error('JWT Authentication error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Generate a JWT token for testing
export const generateToken = (payload: JwtPayload): string => {
  const jwtSecret = config.jwtSecret || 'your-secret-key'; // Fallback for development
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}; 