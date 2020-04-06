'use strict';

// had enabled by egg
// exports.static = true;
exports.cors = {
  enable: true,
  package: 'egg-cors', // 跨域
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
