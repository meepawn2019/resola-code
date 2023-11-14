const { loginService, refreshTokenService, registerService } = require('../../services/auth');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await registerService(email, password);
    res.json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { token } = req.body;
    const refreshToken = await refreshTokenService(token);
    if (refreshToken.error) {
      throw new Error(refreshToken.error);
    }
    res.json(refreshToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginController, refreshTokenController, registerController };
