/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569741843741_7949';
  config.logger = {
    dir: '/didala/dida-server/logs',
  };
  // add your middleware config here
  config.middleware = [];
  // 跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:1026', 'http://localhost:3003', 'https://cv.linkmed.cn' ],
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  exports.session = {
    key: 'EGG_SESS_ID',
    maxAge: 24 * 3600 * 1000, // 1 天 24 * 3600 * 1000
    httpOnly: false,
    encrypt: false,
  };
  // mongo数据库
  exports.mongoose = {
    // url: 'mongodb://127.0.0.1/diary',
    url: 'mongodb+srv://fulong:fulonga@dida-lpq62.mongodb.net/test',
    options: {
      retryWrites: true,
      w: 'majority',
      useUnifiedTopology: true,
    },
  };
  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    logger: {
      dir: '/didala/dida-server/logs',
    },
  };
};
