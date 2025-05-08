require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from '@/api/index';

const PORT = Number(process.env.PORT);

if (!PORT) {
    throw new Error('PORT is not defined');
}

// Initialize express app
const app = express();

// Apply middleware
app.use(helmet());                                      // Helmet is used to secure the app by setting various HTTP headers
app.use(morgan('dev'));                                 // Morgan is used to log the requests
app.use(cors());                                        // Cors is used to allow cross-origin requests
app.use(express.json());                                // Express.js is used to parse the JSON body of the request
app.use(express.urlencoded({ extended: true }));        // Express.js is used to parse the URL-encoded body of the request

// Apply routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Internal Server Error',
        },
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; 