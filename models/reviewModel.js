const mongoose = require('mongoose');
// const validator = require('validator');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: [0, "Rating can't go below 0"],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have an author'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// reviewSchema.pre(/^find/, function (next) {
//   // The populate method generates a sort of subquery to retrieve info
//   this.populate({
//     path: 'user',
//     select: '-__v -passwordChangedAt',
//   });
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
