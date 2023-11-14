const express = require('express');
const {
  getBooksController, createBookController, updateBookController, deleteBookController,
} = require('../../controllers/books');
const authenticationMiddleware = require('../../middlewares/authenticationMiddleware');

const router = express.Router();

router.get('/', getBooksController);
router.post('/', authenticationMiddleware, createBookController);
router.put('/:id', authenticationMiddleware, updateBookController);
router.delete('/:id', authenticationMiddleware, deleteBookController);

module.exports = router;
