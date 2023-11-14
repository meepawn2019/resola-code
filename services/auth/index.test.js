const authService = require('./index');
const User = require('../../models/user');

describe('Test auth service', () => {

  it('Should return token when login', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce({
        dataValues: {
          id: 1,
          email: 'test1@gmail.com',
          password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
        }});
    const responses = await authService.loginService('test1@gmail.com', '12345');

    expect(responses).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('Should return error when login with wrong email', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null);
    try {
      await authService.loginService('test1@gmail.com', '12345');
    } catch (error) {
      expect(error.message).toBe('Wrong email/password');
    }
  });

  it('Should return error when login with wrong password', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce({
        dataValues: {
          id: 1,
          email: 'test1@gmail.com',
          password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
        }});
    try {
      await authService.loginService('test1@gmail.com', '123456');
    } catch (error) {
      expect(error.message).toBe('Wrong email/password');
    }
  });

  it('Should return token when register', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null);
    jest.spyOn(User, 'create')
      .mockResolvedValueOnce({
        dataValues: {
          id: 1,
          email: 'test1@gmail.com',
          password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
        }});
    const responses = await authService.registerService('test1@gmail.com', '12345');

    expect(responses).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  })

  it('Should return error when register with existed email', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce({
        dataValues: {
          id: 1,
          email: 'test1@gmail.com',
        }});
    try {
      await authService.registerService('test1@gmail.com', '12345');
    } catch (error) {
      expect(error.message).toBe('Email already exists');
    }
  });
});