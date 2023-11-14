const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorMiddleware');
const routes = require('./routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/health', (req, res) => res.send({ message: 'ok' }));

app.use('/api/v1', routes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

module.exports = app;