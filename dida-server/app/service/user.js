
'use strict';

const { Service } = require('egg');

// class UserService extends Service {
//   async find(name) {
//     const user = await this.ctx.model.find({ username: name });
//     return user;
//   }
// }
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.model.User.find({ account: name });
    return user;
  }
  async addAdmin(data) {
    const newUser = new this.app.model.User({
      account: data.account,
      password: data.password,
      name: data.name,
    });
    // 使用save()来插入
    await newUser.save();
  }
}
module.exports = UserService;
