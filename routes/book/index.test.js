const request = require('supertest');
const app = require('../../app');
const Book = require('../../models/book');

const mockBookDB = {
  dataValues: {
    id: 1,
    title: 'test1',
    author: 'test1',
    publish_date: '2021-01-01',
    isbn: '123456789',
    price: 100,
  }
}

const mockUpdateBookDB = [
  1,
  [
      {
        dataValues: {
          id: 1,
          title: 'test1',
          author: 'test1',
          publish_date: '2021-01-01',
          isbn: '123456789',
          price: 100,
        }
      }
  ]
]

const mockAuthenResponse = generateToken({
  id: 1,
  email: 'test1@gmail.com',
})

describe('Test the book path', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('GET /BOOK -> OK -> 200 -> book', async () => {
    jest.spyOn(Book, 'findAll')
      .mockResolvedValueOnce([mockBookDB])
    await request(app)
      .get('/api/v1/books')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([{
          id: 1,
          title: 'test1',
          author: 'test1',
          publish_date: '2021-01-01',
          isbn: '123456789',
          price: 100,
        }]);
      });
  });

  it('POST /book -> OK -> 200 -> book', async () => {
    jest.spyOn(Book, 'create')
      .mockResolvedValueOnce(mockBookDB)
    await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${mockAuthenResponse.accessToken}`)
      .send({
          id: 1,
          title: 'test1',
          author: 'test1',
          publish_date: '2021-01-01',
          isbn: '123456789',
          price: 100,
        })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('publish_date');
        expect(res.body).toHaveProperty('isbn');
        expect(res.body).toHaveProperty('price');
      });
  });

  it('POST /book -> OK -> 200 -> book', async () => {
    jest.spyOn(Book, 'create')
      .mockResolvedValueOnce(mockBookDB)
    await request(app)
      .post('/api/v1/books')
      .send({
          id: 1,
          title: 'test1',
          author: 'test1',
          publish_date: '2021-01-01',
          isbn: '123456789',
          price: 100,
        })
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Unauthorized',
        });
      });
  });

  it('PUT /book/{bookId} -> OK -> 200 -> book', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(mockBookDB)
    jest.spyOn(Book, 'update')
      .mockResolvedValueOnce(mockUpdateBookDB)
    await request(app)
      .put('/api/v1/books/1')
      .set('Authorization', `Bearer ${mockAuthenResponse.accessToken}`)
      .send({
        title: 'test1',
        author: 'test1',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          title: 'test1',
          author: 'test1',
          publish_date: '2021-01-01',
          isbn: '123456789',
          price: 100,
        });
      });
  });

  it('PUT /book/{bookId} -> Not existed -> 404 ', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null)
    jest.spyOn(Book, 'update')
      .mockResolvedValueOnce(mockUpdateBookDB)
    await request(app)
      .put('/api/v1/books/1')
      .set('Authorization', `Bearer ${mockAuthenResponse.accessToken}`)
      .send({
        title: 'test12',
        author: 'test12',
      })
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
      });
  });

  it('PUT /book/{bookId} -> No token -> 401 ', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null)
    jest.spyOn(Book, 'update')
      .mockResolvedValueOnce(mockUpdateBookDB)
    await request(app)
      .put('/api/v1/books/1')
      .send({
        title: 'test12',
        author: 'test12',
      })
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Unauthorized',
        });
      });
  });

  it('DELETE /book/{bookId} -> Not Found -> 404 ', async () => {
    jest.spyOn(Book, 'findOne')
      .mockResolvedValueOnce(null)
    await request(app)
      .delete('/api/v1/books/1')
      .set('Authorization', `Bearer ${mockAuthenResponse.accessToken}`)
      .send({
        id: 1,
      })
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Book not found',
        });
      });
  });

});
