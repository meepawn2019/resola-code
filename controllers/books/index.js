const {
  getBooksServive, createBookService, updateBookService, deleteBookService,
} = require('../../services/books');

const getBooksController = async (req, res) => {
  try {
    const books = await getBooksServive();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBookController = async (req, res) => {
  try {
    const book = await createBookService(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookController = async (req, res) => {
  try {
    const book = await updateBookService(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookController = async (req, res) => {
  try {
    const book = await deleteBookService(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
};
