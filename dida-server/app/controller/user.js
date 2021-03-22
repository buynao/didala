'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const userData = ctx.request.body;
    const user = await ctx.service.user.find(userData.account);
    if (!user[0]) {
      await ctx.service.user.addAdmin(userData); // 添加新账户
      ctx.body = {
        error: 0,
        msg: '注册成功!',
      };
    } else {
      ctx.body = {
        error: 1,
        msg: '账号已存在，请直接登录!',
      };
    }
  }
  async login() {
    const { ctx } = this;
    const userData = ctx.method === 'GET' ? ctx.query : ctx.request.body;
    const user = await ctx.service.user.find(userData.account);

    if (user.length > 0 && user[0].password === userData.password) {
    // 设置 Session
      ctx.session.user = {
        authorId: user[0].id,
        name: user[0].name || user[0].account,
      };
      ctx.body = {
        error: 0,
        name: user[0].name || user[0].account,
        msg: '操作成功!',
      };
    } else {
      // await ctx.service.user.addAdmin(); // 添加新账户
      ctx.body = {
        error: 1,
        msg: '账号名称或密码不存在!',
      };
    }
  }
  async checkLogin() {
    const { ctx } = this;
    const user = ctx.session.user;
    const userData = ctx.method === 'GET' ? ctx.query : ctx.request.body;
    ctx.logger.info('iep:', userData)
    ctx.body = userData;
  }
  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    ctx.body = {
      error: 0,
      msg: '退出',
      data: {
        redict: '/login',
      },
    };

  }
}

module.exports = UserController;
