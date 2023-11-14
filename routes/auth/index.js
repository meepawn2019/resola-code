const express = require('express');
const { loginController, registerController } = require('../../controllers/auth');

const router = express.Router();
router.post('/login', loginController);

router.post('/register', registerController);

router.post('/logout', (req, res) => {
  res.json({ message: 'logout' });
});

module.exports = router;
