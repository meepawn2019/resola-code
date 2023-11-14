const jwt = require('jsonwebtoken');

const tokenHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    next({ status: 401, message: 'Unauthorized' });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.tokenPayload = decoded;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({ status: 401, message: 'Unauthorized' });
  }
};

module.exports = tokenHandler;
