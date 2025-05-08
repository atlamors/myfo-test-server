import { Router, Request, Response } from 'express';
import v1Router from './v1';

const router = Router();

// Root endpoint
router.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'API is running',
    });
});

// Register API versions
router.use('/v1', v1Router);

export default router; 