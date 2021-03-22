'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const iepSchema = new mongoose.Schema({
    trueName: { type: String, default: '姓名' },
    phone: { type: String, default: '110' },
    email: { type: String, default: '301' },
    nickName: { type: String, default: 'nickName' },
    hospital: { type: String, default: 'hospital' },
    major: { type: String, default: 'major' },
    positional_Titles: { type: String, default: 'positional_Titles' },
    unionId: { type: String, default: 'unionId' },
    memberType: { type: String, default: 'memberType' },
    refer: { type: String, default: '' },
    dateTime: { type: Date },
  });
  iepSchema.pre('save', function(next) {
    this.dateTime = new Date();
    next();
  });
  return mongoose.model('Iep', iepSchema);
};
