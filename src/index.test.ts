import request from 'supertest';
import app from './index';
import { generateToken } from './middleware/auth';

describe('Server', () => {
  it('should return 200 for health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should return 200 for API root', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 200 for accounts API when authenticated', async () => {
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
    expect(response.body).toHaveProperty('accountId');
  });
}); 