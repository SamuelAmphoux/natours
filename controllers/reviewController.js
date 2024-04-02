const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = (req, res, next) => {
  req.query = {
    ...req.query,
    tour: req.params.tourId,
  };

  const generalGetAllFn = factory.getAll(Review);
  generalGetAllFn(req, res, next);
};

exports.setTourAndUserIds = (req, res, next) => {
  // Allow nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
