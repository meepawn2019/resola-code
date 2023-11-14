const authController = require('./index');
const User = require('../../models/user');
const CustomError = require('../../error');

const mockUserReturnData = {
  dataValues: {
    id: 1,
    email: 'test1@gmail.com',
    password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
  },
}

describe('Test the auth controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should return token when login', async () => {

    const mockRequest = {
      body: { email: 'test1@gmail.com', password: '12345' },
    }
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserReturnData);

    await authController.loginController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('Should return error when login with wrong email', async () => {
      
    const mockRequest = {
      body: { email: 'test1@gmail.com', password: '12345' },
    };
    const mockResponse = { json: jest.fn(), status: jest.fn() };
    const mockNext = jest.fn();

    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null);
    
    await authController.loginController(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledWith(new CustomError('Wrong email/password', 400));
  });

  
  it('Should return error when login with wrong password', async () => {
      
    const mockRequest = {
      body: { email: 'test1@gmail.com', password: '123456' },
    };
    const mockResponse = { json: jest.fn(), status: jest.fn() };
    const mockNext = jest.fn();

    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserReturnData);
    
    await authController.loginController(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledWith(new CustomError('Wrong email/password', 400));
  });


  it('Should return token when register', async () => {

    const mockRequest = {
      body: { email: 'test1@gmail.com', password: '12345' },
    };
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null);
    
    jest.spyOn(User, 'create')
      .mockResolvedValueOnce(mockUserReturnData);

    await authController.registerController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toBeCalledWith(201);
    expect(mockResponse.json).toBeCalledWith({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('Should return Error when email existed', async () => {

    const mockRequest = {
      body: { email: 'test1@gmail.com', password: '12345' },
    };
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserReturnData);

    await authController.registerController(mockRequest, mockResponse, mockNext);


    expect(mockNext).toBeCalledWith(new CustomError('Email already exists', 400));
  });
});