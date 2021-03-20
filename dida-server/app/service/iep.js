
'use strict';

const { Service } = require('egg');

class IEPService extends Service {
  async add(data = {}) {
    const { ctx } = this;
    ctx.logger.info('IEP --------------ctx.request.body', ctx.request.body);
    ctx.logger.info('IEP --------------data', data);
    const newIEPUser = new this.app.model.IEP({
      account: 'test',
      password: 'test',
      dateTime: 'sddd',
      name: 'xxxx',
    });
    // 使用save()来插入
    await newIEPUser.save();
    return newIEPUser;
  }
}
module.exports = IEPService;
