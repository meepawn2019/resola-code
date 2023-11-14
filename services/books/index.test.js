const bookServices = require('./index');
const Book = require('../../models/book');

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

describe('Test book service', () => {

  it('Should return array of books when getBooks', async () => {
    jest.spyOn(Book, 'findAll')
      .mockResolvedValueOnce(mockBooksDB);
    
    const expectedResponse = mockBooksDB.map((book) => book.dataValues);

    const responses = await bookServices.getBooksServive();

    expect(responses).toEqual(expectedResponse);
  });

  it('Should return book when createBook', async () => {
    jest.spyOn(Book, 'create')
      .mockResolvedValueOnce(mockBooksDB[0]);

    const mockBody = {
      title: 'magika4',
      author: 'Toei',
      publish_date: '2023-11-14T05:37:57.000Z',
      isbn: '2223456',
      price: '92',
    }
    
    const expectedResponse = mockBooksDB[0].dataValues;

    const responses = await bookServices.createBookService(mockBody);

    expect(responses).toEqual(expectedResponse);
  });

  it('Should return book when updateBook', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(mockBooksDB[0]);
    const { dataValues: mockBooksDBSearch } = mockBooksDB.find((book) => book.dataValues.id === 5);
    const expectedResponse = {
      ...mockBooksDBSearch,
      title: 'magika5',
      author: 'google',
    };

    const mockBody = {
      title: 'magika5',
      author: 'google',
    }

    jest.spyOn(Book, 'update')
      .mockResolvedValueOnce([1, [{
        dataValues: expectedResponse,
      }]]);

    const responses = await bookServices.updateBookService(5, mockBody);

    expect(responses).toEqual(expectedResponse);
  });

  it('Should return error when updateBook with wrong id', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null);

    const mockBody = {
      title: 'magika5',
      author: 'google',
    }

    try {
      await bookServices.updateBookService(5, mockBody);
    } catch (error) {
      expect(error.message).toBe('Book not found');
    }
  });

  it('Should return book when deleteBook', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(mockBooksDB[0]);
    
    const expectedResponse = 1;

    jest.spyOn(Book, 'destroy')
      .mockResolvedValueOnce(expectedResponse);

    const responses = await bookServices.deleteBookService(5);

    expect(responses).toEqual(expectedResponse);
  });

  it('Should return error when deleteBook with wrong id', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null);

    try {
      await bookServices.deleteBookService(5);
    } catch (error) {
      expect(error.message).toBe('Book not found');
    }
  });

});