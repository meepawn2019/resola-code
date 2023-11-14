const express = require("express");
const {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} = require("../../controllers/books");
const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publish_date
 *         - isbn
 *         - price
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of the book
 *         title:
 *          type: string
 *          description: The title of your book
 *         author:
 *          type: string
 *          description: The book author
 *         publish_date:
 *          type: Date
 *          description: Publish date of the book
 *         isbn:
 *          type: string
 *          description: ISBN of the book
 *         price:
 *          type: number
 *          description: Price of the book
 *         createdAt:
 *          type: string
 *          format: date
 *          description: The date the book was added
 *         updatedAt:
 *          type: string
 *          format: date
 *          description: The date the book was updated
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         publish_date: 1989-01-01
 *         isbn: 0805071660
 *         price: 17.66
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Book]
 *     description: Retrieve a list of books. Use this route to get all the books available.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", getBooksController);


/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     description: This route is used to create a new book.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Unauthorized
 */
router.post("/", authenticationMiddleware, createBookController);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Book]
 *     description: This route is used to update a book.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Unauthorized
 *       404:
 *         description: Book not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Book not found
 */
router.put("/:id", authenticationMiddleware, updateBookController);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Book]
 *     description: This route is used to delete a book.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the book to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Unauthorized
 *       404:
 *         description: Book not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Book not found
 */
router.delete("/:id", authenticationMiddleware, deleteBookController);


module.exports = router;
