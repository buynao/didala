// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIpe = require('../../../app/service/iep');
import ExportTask = require('../../../app/service/task');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    ipe: ExportIpe;
    task: ExportTask;
    user: ExportUser;
  }
}
