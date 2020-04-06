
'use strict';

const { Service } = require('egg');
// class TaskService extends Service {
//   async find(name) {
//     const user = await this.ctx.model.find({ username: name });
//     return user;
//   }
// }
class TaskService extends Service {
  // 默认不需要提供构造函数。
//   constructor(ctx) {
//     super(ctx); // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
//     // 就可以直接通过 this.ctx 获取 ctx 了
//     // 还可以直接通过 this.app 获取 app 了
//   }
  async add(data = {}) {
    const { ctx } = this;
    const user = ctx.session.user;
    const newTask = new this.app.model.Task({
      ...data,
      id: this.app.model.Task.schema.ObjectId,
      startTime: data.startTime ? new Date(`${data.startTime}`) : new Date(),
      ahthor: user.authorId,
    });
    // 使用save()来插入
    await newTask.save();
    delete newTask.ahthor;
    return newTask;
  }
  async update(data = {}) {
    await this.ctx.model.Task.update({ _id: data._id }, data);
  }
  async find(data = {}) {
    const timeZone = data.query.startDate ? {
      startTime: {
        $gte: new Date(Number(data.query.startDate)),
        $lte: new Date(Number(data.query.endDate)),
      },
    } : {};
    const Tasks = await this.ctx.model.Task.find({
      ahthor: data.ahthor,
      ...timeZone,
    }, {
      __v: false,
      ahthor: false,
    }).sort({
      startTime: -1,
    });
    if (Tasks) {
      return {
        error: 0,
        msg: '操作成功!',
        list: Tasks || [],
      };
    }
    return {
      error: 1,
      msg: '网络异常!',
      list: [],
    };
  }
  async remove(_id) {
    await this.ctx.model.Task.find({ _id }).remove();
    return {
      error: 0,
      msg: '操作成功!',
    };
  }
}
module.exports = TaskService;
