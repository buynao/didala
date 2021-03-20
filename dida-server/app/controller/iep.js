'use strict';

const Controller = require('egg').Controller;

class IepController extends Controller {

  async addUser() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await ctx.service.iep.add(data);
  }
}

module.exports = IepController;

