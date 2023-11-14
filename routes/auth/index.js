const express = require('express');
const { loginController, registerController } = require('../../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of user
 *         email:
 *          type: string
 *          description: User's email
 *         password:
 *          type: string
 *          description: User's password
 *         createdAt:
 *          type: string
 *          format: date
 *          description: The datetime user was added
 *         updatedAt:
 *          type: string
 *          format: date
 *          description: The datetime user was updated
 *       example:
 *         id: 1
 *         email: test1@gmail.com
 *         password: 12345
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *          type: string
 *          description: User's email
 *         password:
 *          type: string
 *          description: User's password
 *       example:
 *         email: test1@gmail.com
 *         password: 12345
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: This route is used to login.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       200:
 *         description: The user token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token
 *       400:
 *         description: Wrong email/password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Wrong email/password
 */
router.post('/login', loginController);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Add new user
 *     tags: [Auth]
 *     description: This route is used to register for new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthBody'
 *     responses:
 *       200:
 *         description: The user token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token
 *       400:
 *         description: Email already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Email already exists
 */
router.post('/register', registerController);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log user out
 *     tags: [Auth]
 *     description: This route is used to log out current user.
 *     responses:
 *       200:
 *         description: User loggout message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Logout message
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'logout' });
});

module.exports = router;
