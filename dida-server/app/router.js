'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller = {} } = app;
  const { user = {} } = controller;
  router.post('/api/register', user.register); // 注册
  router.post('/api/login', user.login); // 登录
  router.get('/api/checkLogin', user.checkLogin); // 检查登录态
  router.post('/api/checkLogin', user.checkLogin); // 检查登录态
  router.get('/api/logout', user.logout); // 退出登录

  router.get('/iep/live', controller.iep.showPage); // iep middley
  router.post('/iep/live', controller.iep.addUser); // 保存iep返回的用户信息

  router.post('/api/v1/batch/task', controller.task.batch); // 任务增加
  router.post('/api/v1/all/task', controller.task.get); // 任务查询
  router.post('/api/v1/delete/task', controller.task.delete); // 任务删除
  router.post('/api/v1/update/task', controller.task.update); // 任务更新
};
