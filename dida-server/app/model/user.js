'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    account: { type: String },
    password: { type: String },
    dateTime: { type: Date },
    name: { type: String },
  });
  UserSchema.pre('save', function(next) {
    this.dateTime = new Date();
    next();
  });
  return mongoose.model('User', UserSchema);
};
