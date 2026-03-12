const request = require('supertest');
const app = require('../server');

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

describe('API Tasks', () => {
  // Variable pour stocker le token JWT
  let token = '';
  // Pour stocker l'ID de la tâche que l'on va créer
  let createdTaskId = ''; 

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password'
      });
    
    token = response.body.token;
  });

  it('Should refuse the access if not anny token is provided return 401 status code', async () => {
    const response = await request(app).get('/api/tasks');
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Token d'accès requis");
  });

  it('Should return the list ok task with a valid token return 200 status code', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('Shoudl create a new task return 201 status code', async () => {
    const newTask = {
      title: 'New test task',
      description: 'test description',
      priority: 'high'
    };

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTask.title);
    expect(response.body).toHaveProperty('id');
    
    // We keep the if of the created task for the delete test
    createdTaskId = response.body.id; 
  });

  it('Should delete the task return 204 status code', async () => {
    const response = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});