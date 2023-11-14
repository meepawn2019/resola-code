const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../../error');
const {
  getUserByEmail,
  createUserService,
} = require('../users');
require('dotenv').config();

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
};

const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

const refreshTokenService = async (token) => {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return { error: err.message };
    }
    const accessToken = generateAccessToken({ name: user.name });
    return { accessToken, refreshToken: token };
  });
};

const loginService = async (email, password) => {
  const userData = await getUserByEmail(email);
  if (!userData) {
    throw new CustomError('Wrong email/password', 400);
  }
  const validPassword = await bcrypt.compare(
    password,
    userData.password,
    );
    
    if (!validPassword) {
      throw new CustomError('Wrong email/password', 400);
    }
  return generateToken({
    id: userData.id,
    email: userData.email,
  });
};

const registerService = async (email, password) => {
  try {
    const userData = await getUserByEmail(email);
    if (userData) {
      throw new CustomError('Email already exists', 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUserService({
      email,
      password: hashedPassword,
    });
    return generateToken({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

module.exports = { loginService, refreshTokenService, registerService };
