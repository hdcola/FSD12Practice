const request = require('supertest');
const app = require('../app');
const { createUser } = require('../services/user-service');
const ApiError = require('../utils/api-error');
const { User } = require('../models');

jest.mock('../services/user-service');
jest.mock('../models');

describe('POST /api/users/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const mockToken = 'mockToken';
    createUser.mockResolvedValue(mockToken);

    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sucess', true);
    expect(response.body).toHaveProperty('message', 'User created!');
    expect(response.body).toHaveProperty('token', mockToken);
  });

  it('should fail to register a user with an existing username', async () => {
    const mockError = ApiError.badRequest('Validation Error', []);
    createUser.mockRejectedValue(mockError);

    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'existinguser', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Validation Error');
  });
});
