const { loginService, refreshTokenService, registerService } = require('../../services/auth');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.json(token);
  } catch (error) {
    next(error)
  }
};

const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await registerService(email, password);
    res.status(201).json(token);
  } catch (error) {
    next(error)
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const { token } = req.body;
    const refreshToken = await refreshTokenService(token);
    if (refreshToken.error) {
      throw new Error(refreshToken.error);
    }
    res.json(refreshToken);
  } catch (error) {
    next(error)
  }
};

module.exports = { loginController, refreshTokenController, registerController };
