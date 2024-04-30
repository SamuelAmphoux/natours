const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
// // Require user in the case where we use embedding
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: [40, 'The name must be less or equal 40 characters'],
      minlength: [8, 'the name must be more than 8 characters'],
      validate: {
        validator: function (val) {
          return validator.isAlpha(val, 'en-US', { ignore: ' ' });
        },
        message: 'Tours name must be characters not numeric',
      },
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can be: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, "Rating can't go below 0"],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => val.toPrecision(3),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          if (this.op.match(/^find/)) {
            return val < this.getUpdate().$set.price;
          }
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON to specify geo data
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      adress: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        adress: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate
// We indicate where to find the field with the ID in both documents
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Document Middleware : runs before the .save() and .create() [NOT .insertMany]
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// // Denormalize by embedding user into Tours
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', (next) => {
//   console.log('Will save document');
//   next();
// });

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  // The populate method generates a sort of subquery to retrieve info
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} ms!`);
//   next();
// });

const matchStage = {
  $match: {
    secretTour: { $ne: true },
  },
};

// Aggregation middleware
tourSchema.pre('aggregate', function (next) {
  const firstStage = this.pipeline()[0];

  if (
    firstStage &&
    Object.prototype.hasOwnProperty.call(firstStage, '$geoNear')
  ) {
    this.pipeline().splice(1, 0, matchStage);
  } else {
    this.pipeline().unshift(matchStage);
  }

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
