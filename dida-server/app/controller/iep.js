'use strict';

const Controller = require('egg').Controller;

class IepController extends Controller {
  async showPage() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.logger.info('中转页地址', query);
    ctx.redirect('https://www.douyu.com');
  }
  async addUser() {
    const { ctx } = this;
    const userData = ctx.request.body;
    const query = ctx.query;
    const user = await ctx.service.iep.findUser(userData);
    ctx.logger.info('iep 用户信息:', userData);
    ctx.logger.info('iep 中转页:', query.refer);
    if (!user[0]) {
      await ctx.service.iep.addUser({
        ...userData,
        refer: query.refer
      }); // 添加新iep用户
      ctx.body = {
        error: 0,
        msg: '添加成功',
      };
    } else {
      ctx.body = {
        error: 1,
        msg: '用户已存在',
      };
    }
  }
}

module.exports = IepController;

