/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

// Initiating app
const app = express();

// Setting pug for templates
app.set('view engine', 'pug');
// Locating views
app.set('views', path.join(__dirname, 'views'));
// Serve static files (located in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

// // Global Middlewares

// Set security HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://api.mapbox.com', 'blob:', "'self'"],
      connectSrc: [
        "'self'",
        'https://api.mapbox.com',
        'https://events.mapbox.com',
      ],
    },
  }),
);

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same IP
const limiter = rateLimit({
  // Allow 100 requests from same IP
  max: 100,
  // In 1 Hour
  windowMs: 60 * 60 * 1000,
  // Message sent when limit is exceeded
  message: 'Too many requests from this IP, please try again in an hour',
});
// rateLimit creates a middleware that we can use on our app
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Sanitize data (against NoSQL query injection)
app.use(mongoSanitize());

// Sanitize data (against XSS)
app.use(xss());

// Prevent parameter pollution
// example: if query has "sort: duration" and "sort: price"
// It will only take the last parameter into account
app.use(
  hpp({
    // Exceptions where we might want to have duplicate parameters
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Mounting Routers
// Route to retrieve the Mapbox access token
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
