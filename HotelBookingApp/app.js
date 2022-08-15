const express = require('express');
const morgan = require('morgan');

const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedTimestamp = new Date().toISOString();
  next();
});

// Routes

app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);

// Server

module.exports = app;
