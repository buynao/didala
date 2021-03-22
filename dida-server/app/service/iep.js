
'use strict';

const { Service } = require('egg');

class IEPService extends Service {
  async findUser(userData) {
    ctx.logger.info('this.ctx.model:', this.ctx.model);
    ctx.logger.info('this.ctx.model.iEP:', this.ctx.model.iEP);
    ctx.logger.info('this.ctx.model.iEP.find:', this.ctx.model.iEP.find);
    const user = await this.ctx.model.iEP.find({ unionId: userData.unionId });
    return user;
  }
  async addUser(data = {}) {
    const newUser = new this.app.model.iEP({
      ...data,
    });
    await newUser.save();
  }
}
module.exports = IEPService;
