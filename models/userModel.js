const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    unique: true,
    maxlength: [40, 'The name must be less or equal 15 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'The password must be more than 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // This only works on .create and .save (NOT .update)
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords must be identicals',
    },
  },
  passwordChangedAt: Date,
  passWordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Middleware to encrypt password before saving it to DB
userSchema.pre('save', async function (next) {
  // Only run if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with CPU cost of 12
  this.password = await bcrypt.hash(this.password, 16);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Middleware to modify the passwordChangedAt property on a user
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Query middleware to ensure only active users are retrieved
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    // If JWTTimestamp is less than changedTimestamp, it means that the token
    // was issued BEFORE the last password change so it is TRUE
    // that the password was changed
    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed meaning
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passWordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires =
    Date.now() + parseInt(process.env.PASSWORD_RESET_EXP, 10);

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
