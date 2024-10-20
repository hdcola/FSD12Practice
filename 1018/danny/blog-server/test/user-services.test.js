// services/userService.js
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Sequelize } = require('sequelize');
const { generateToken } = require('../utils/jwt');
const ApiError = require('../utils/api-error');
const { createUser } = require('../services/user-service');

jest.mock('../models');
jest.mock('bcrypt');
jest.mock('../utils/jwt');

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedpassword',
    };
    const mockToken = 'mockToken';

    generateToken.mockReturnValue(mockToken);
    bcrypt.hash.mockResolvedValue('hashedpassword');
    User.create.mockResolvedValue(mockUser);

    const result = await createUser({
      username: 'testuser',
      password: 'password123',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'hashedpassword',
    });
    expect(generateToken).toHaveBeenCalledWith({ username: 'testuser' });
    expect(result).toBe(mockToken);
  });

  it('should throw a validation error', async () => {
    const mockError = new Sequelize.ValidationError('Validation Error', [
      { message: 'Username is required', path: 'username' },
    ]);

    bcrypt.hash.mockResolvedValue('hashedpassword');
    User.create.mockRejectedValue(mockError);

    await expect(
      createUser({ username: '', password: 'password123' })
    ).rejects.toBeInstanceOf(ApiError);

    await expect(
      createUser({ username: '', password: 'password123' })
    ).rejects.toThrow(ApiError);

    try {
      await createUser({ username: '', password: 'password123' });
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Validation Error');
      expect(err.errors).toEqual([
        { message: 'Username is required', field: 'username' },
      ]);
    }
  });

  it('should throw a generic error', async () => {
    const mockError = new Error('Generic Error');

    bcrypt.hash.mockResolvedValue('hashedpassword');
    User.create.mockRejectedValue(mockError);

    await expect(
      createUser({ username: 'testuser', password: 'password123' })
    ).rejects.toThrow('Generic Error');
  });
});
