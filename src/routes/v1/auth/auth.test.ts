import request from 'supertest';
import express from 'express';
import authRouter from './index';

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);

describe('Auth API', () => {
  it('should return a JWT token when login is called', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('expiresIn');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('userId');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).toHaveProperty('role');
  });
}); 