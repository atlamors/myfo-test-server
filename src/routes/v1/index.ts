import { Router } from 'express';
import accountsRouter from './accounts';
import authRouter from './auth';

const router = Router();

// Register routes
router.use('/accounts', accountsRouter);
router.use('/auth', authRouter);

export default router; 