const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

const mockUserDB = {
  dataValues: {
    id: 1,
    email: 'test1@gmail.com',
    password: '$2b$10$tnbMED20FJ9mV5lxxGXSk.XrQeJ8Oim5FjUtaX2apOAdfRe/cFBTq',
  }
}

describe('Test the auth path', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('POST /login -> OK -> 200 -> token', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserDB)
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@gmail.com',
        password: '12345',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
      });
  });

  it('POST /login -> No email -> 400', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null)
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test12@gmail.com',
        password: '12345',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Wrong email/password');
      });
  });

  it('POST /login -> Wrong password -> 400', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserDB)
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@gmail.com',
        password: '123456',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Wrong email/password');
      });
  });

  it('POST /register -> OK -> 201', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(null)
    jest.spyOn(User, 'create')
      .mockResolvedValueOnce(mockUserDB)
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test1@gmail.com',
        password: '12345',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
      });
  });

  it('POST /register -> User existed -> 400', async () => {
    jest.spyOn(User, 'findOne')
      .mockResolvedValueOnce(mockUserDB)
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test1@gmail.com',
        password: '12345',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Email already exists');
      });
  });
});