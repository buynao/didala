'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const IEPSchema = new mongoose.Schema({
    account: { type: String },
    password: { type: String },
    dateTime: { type: Date },
    name: { type: String },
  });
  IEPSchema.pre('save', function(next) {
    this.dateTime = new Date();
    next();
  });
  return mongoose.model('IEP', IEPSchema);
};
