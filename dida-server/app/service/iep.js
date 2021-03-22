
'use strict';

const { Service } = require('egg');

class IEPService extends Service {
  async findUser(userData) {
    const user = await this.ctx.model.IEP.find({ unionId: userData.unionId });
    return user;
  }
  async addUser(data = {}) {
    const newUser = new this.app.model.IEP({
      ...data,
    });
    await newUser.save();
  }
}
module.exports = IEPService;
