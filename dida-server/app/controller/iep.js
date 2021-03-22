'use strict';

const Controller = require('egg').Controller;

class IepController extends Controller {

  async addUser() {
    const { ctx } = this;
    const data = ctx.request.body;
    await ctx.service.iep.add(data);
    ctx.body = {
      code: 200,
      msg: 'success',
      data: data
    };
  }
}

module.exports = IepController;

