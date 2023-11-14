const bookController = require('./index');
const Book = require('../../models/book');
const CustomError = require('../../error');

const mockBooksDB = [
  {
    dataValues: {
      id: 5,
      title: 'magika4',
      author: 'Toei',
      publish_date: '2023-11-14T05:37:57.000Z',
      isbn: '2223456',
      price: '92',
    }
  }
]

const expectedBooksResponse = [
  {
    id: 5,
    title: 'magika4',
    author: 'Toei',
    publish_date: '2023-11-14T05:37:57.000Z',
    isbn: '2223456',
    price: '92',
  }
]
describe('Test book controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return array of books when getBooks', async () => {

    const mockRequest = {};
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'findAll')
      .mockResolvedValueOnce(mockBooksDB);

    await bookController.getBooksController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith(expectedBooksResponse);
  });

  it('Should return book when createBook', async () => {

    const mockRequest = {
      body: mockBooksDB[0].dataValues,
    };
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'create')
      .mockResolvedValueOnce(mockBooksDB[0]);

    await bookController.createBookController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith(expectedBooksResponse[0]);
  });

  it('Should return book when updateBook', async () => {

    const mockRequest = {
      params: {
        id: 5,
      },
      body: mockBooksDB[0].dataValues,
    };
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(mockBooksDB[0]);
    jest.spyOn(Book, 'update')
      .mockResolvedValueOnce([1, [mockBooksDB[0]]]);

    await bookController.updateBookController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith(expectedBooksResponse[0]);
  });

  it('Should return error when updateBook with id not found', async () => {

    const mockRequest = {
      params: {
        id: 5,
      },
      body: mockBooksDB[0].dataValues,
    };

    const mockResponse = { json: jest.fn(), status: jest.fn() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null);

    await bookController.updateBookController(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledWith(new CustomError('Book not found', 404));
  });

  it('Should return book when deleteBook', async () => {

    const mockRequest = {
      params: {
        id: 5,
      },
    };
    const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(mockBooksDB[0]);
    jest.spyOn(Book, 'destroy')
      .mockResolvedValueOnce(1);

    await bookController.deleteBookController(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith(1);
  });

  it('Should return error when deleteBook with id not found', async () => {

    const mockRequest = {
      params: {
        id: 5,
      },
    };

    const mockResponse = { json: jest.fn(), status: jest.fn() };
    const mockNext = jest.fn();

    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null);

    await bookController.deleteBookController(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledWith(new CustomError('Book not found', 404));
  });

});

