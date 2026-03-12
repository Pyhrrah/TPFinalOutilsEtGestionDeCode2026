const app = require('supertest');
const app = require('./server');
const { request } = require('../server');

describe('API Health Check', () => {
  it('Should return OK status return code 200', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('Should return (route non trouvée) return code 404', async () => {
    const response = await request(app).get('/route-qui-nexiste-pas');
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route non trouvée');
  });
});