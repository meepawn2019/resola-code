const userServices = require('./index');
const User = require('../../models/user');

const mockUserReturnData = {
  dataValues: {
    id: 1,
    email: 'test1@gmail.com',
    password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
  },
}

describe('Test user service', () => {

  it('Should return user when create user', async () => {
    jest.spyOn(User, 'create')
      .mockResolvedValueOnce(mockUserReturnData);

      const mockBody = {
        email: 'test1@gmail.com',
        password: '12345',
      }

    const responses = await userServices.createUserService(mockBody);

    expect(responses).toEqual({
      id: expect.any(Number),
      email: expect.any(String),
      password: expect.any(String),
    });
  });

  it('Should return user when get user by email', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserReturnData);

    const responses = await userServices.getUserByEmail('test1@gmail.com');

    expect(responses).toEqual({
      id: expect.any(Number),
      email: expect.any(String),
      password: expect.any(String),
    });
  });

});

