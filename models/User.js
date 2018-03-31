const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 2, uniqueCaseInsensitive: true, required: true },
  email: { type: String, uniqueCaseInsensitive: true, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

userSchema.pre('validate', function checkPasswordMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
