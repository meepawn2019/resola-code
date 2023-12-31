const CustomError = require('../../error');
const Book = require('../../models/book');

const getBooksServive = async (filter) => {
  try {
    if (filter) {
      // Convert string query to object
      const searchParams = new URLSearchParams(filter);
      const query = Object.fromEntries(searchParams.entries());
      const books = await Book.findAll({
        where: query,
        attributes: [
          'id',
          'title',
          'author',
          'publish_date',
          'isbn',
          'price',
          'createdAt',
          'updatedAt',
        ],
      });
      return books.map((book) => book.dataValues);
    }
    const books = await Book.findAll({
      attributes: [
        'id',
        'title',
        'author',
        'publish_date',
        'isbn',
        'price',
        'createdAt',
        'updatedAt',
      ],
    });
    return books.map((book) => book.dataValues);
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const createBookService = async (book) => {
  try {
    const newBook = await Book.create(book);
    return newBook.dataValues;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const updateBookService = async (id, book) => {
  try {
    const bookData = await Book.findOne({
      where: { id },
      attributes: [
        'id',
      ],
    });
    if (!bookData) {
      throw new CustomError('Book not found', 404);
    }
    const updatedBook = await Book.update(book, {
      where: { id },
      returning: true,
    });
    return updatedBook[1][0].dataValues;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const deleteBookService = async (id) => {
  try {
    const bookData = await Book.findOne({
      where: { id },
      attributes: [
        'id',
      ],
    });
    if (!bookData) {
      throw new CustomError('Book not found', 404);
    }
    return await Book.destroy({
      where: { id },
    });
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

module.exports = {
  getBooksServive,
  createBookService,
  updateBookService,
  deleteBookService,
};
