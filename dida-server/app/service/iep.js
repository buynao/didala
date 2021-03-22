
'use strict';

const { Service } = require('egg');

class IEPService extends Service {
  async findUser(userData) {
    this.ctx.logger.info('this.ctx.model:', this.ctx.model);
    this.ctx.logger.info('this.ctx.model.iEP:', this.ctx.model.Iep);
    this.ctx.logger.info('this.ctx.model.iEP.find:', this.ctx.model.Iep.find);
    const user = await this.ctx.model.Iep.find({ unionId: userData.unionId });
    return user;
  }
  async addUser(data = {}) {
    const newUser = new this.app.model.Iep({
      ...data,
    });
    await newUser.save();
  }
}
module.exports = IEPService;
