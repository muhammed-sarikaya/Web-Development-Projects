const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A hotel must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A hotel name must have less or equal then 40 characters',
      ],
      minlength: [
        10,
        'A hotel name must have more or equal then 10 characters',
      ],
      // validate: [validator.isAlpha, 'hotel name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A hotel must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A hotel must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A hotel must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A hotel must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A hotel must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secrethotel: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
