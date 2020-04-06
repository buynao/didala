'use strict';


const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = app => {
  const mongoose = app.mongoose;
  const TaskSchema = new mongoose.Schema({
    // 作者
    ahthor: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    id: {
      type: Schema.Types.ObjectId,
    },
    // 状态
    status: {
      type: Number, // 0 未完成  1已完成 2删除
      default: 0,
    },
    // 标题
    title: {
      type: String,
    },
    // 内容
    content: {
      type: String,
      default: '',
    },
    // 创建时间
    startTime: {
      type: Date,
      default: null,
    },
    // 修改时间
    modifiedTime: {
      type: Date,
      default: null,
    },
    // 完成时间
    closeTime: {
      type: Date,
      default: null,
    },
    // 删除时间
    deleteTime: {
      type: Date,
      default: null,
    },
    // 是否删除过
    deleteCount: {
      type: Number,
      default: 0,
    },
    // 标签
    etag: {
      default: '',
      type: String,
    },
    // 清单名称
    name: {
      default: '',
      type: String,
    },
    // 颜色
    color: {
      default: '',
      type: String,
    },
  });
  // TaskSchema.pre('save', function(next) {
  //   this.startTime = new Date();
  //   next();
  // });
  return mongoose.model('Task', TaskSchema);
};
