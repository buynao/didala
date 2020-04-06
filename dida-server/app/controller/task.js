'use strict';

const Controller = require('egg').Controller;
const sessionError = {
  error: 1,
  msg: '权限不足',
};
class TaskController extends Controller {

  async batch() {
    const { ctx } = this;
    if (!ctx.session.user) {
      ctx.body = sessionError;
    } else {
      const data = ctx.request.body;
      ctx.body = await ctx.service.task.add(data);
    }
  }

  async update() {
    const { ctx } = this;
    if (!ctx.session.user) {
      ctx.body = sessionError;
    } else {
      const data = ctx.request.body;
      const resData = {
        error: 0,
        msg: '更新成功!',
      };
      if (data._id) {
        await ctx.service.task.update(data);
      } else {
        resData.error = 1;
        resData.msg = 'id不存在';
      }
      ctx.body = resData;
    }
  }

  async get() {
    const { ctx } = this;
    if (!ctx.session.user) {
      ctx.body = sessionError;
    } else {
      ctx.body = await ctx.service.task.find({
        ahthor: ctx.session.user.authorId,
        query: ctx.request.body,
      });
    }
  }

  async delete() {
    const { ctx } = this;
    if (!ctx.session.user) {
      ctx.body = sessionError;
    } else {
      const data = ctx.request.body;
      ctx.body = await ctx.service.task.remove(data.id);
    }
  }

}

module.exports = TaskController;

