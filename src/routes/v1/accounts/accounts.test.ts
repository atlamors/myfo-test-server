import request from 'supertest';
import express from 'express';
import accountsRouter from './index';
import { generateToken } from '../../../middleware/auth';

const app = express();
app.use(express.json());
app.use('/api/v1/accounts', accountsRouter);

describe('Accounts API', () => {
  it('should return 401 when no token is provided', async () => {
    const response = await request(app).get('/api/v1/accounts');
    expect(response.status).toBe(401);
  });

  it('should return account details when authenticated', async () => {
    // Generate a valid token for testing
    const token = generateToken({
      userId: '12345',
      email: 'test@example.com',
      role: 'user'
    });

    const response = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accountId', 'abc-123');
    expect(response.body).toHaveProperty('accountName', 'Primary Checking');
    expect(response.body).toHaveProperty('balance', 17500.35);
    expect(response.body).toHaveProperty('currency', 'USD');
    expect(response.body).toHaveProperty('accountType', 'Checking');
  });
}); 