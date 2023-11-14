const {
  getBooksServive, createBookService, updateBookService, deleteBookService,
} = require('../../services/books');

const getBooksController = async (req, res, next) => {
  try {
    const query = req.query;
    const books = await getBooksServive(query);
    res.json(books);
  } catch (error) {
    next(error)
  }
};

const createBookController = async (req, res, next) => {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error)
  }
};

const updateBookController = async (req, res, next) => {
  try {
    const book = await updateBookService(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    next(error)
  }
};

const deleteBookController = async (req, res, next) => {
  try {
    const book = await deleteBookService(req.params.id);
    res.json(book);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
};
