import { Router, Request, Response } from 'express';
import v1Router from './v1';

const apiRouter = Router();

// Root endpoint
apiRouter.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'API is running',
    });
});

// Register API versions
apiRouter.use('/v1', v1Router);

export default apiRouter; 