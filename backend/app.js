const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const enrollRouter = require('./routes/enrollRouter');
const globalErrorController = require('./controller/errorController');
const AppError = require('./utilis/appError');

// 1) Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/enroll', enrollRouter);

// 3) Method for unhandling routes

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
