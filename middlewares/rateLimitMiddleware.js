const rateLimit = require('express-rate-limit');

const rateLimitHandler = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'You have exceeded the 100 requests in one hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimitHandler;