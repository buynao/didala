// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIep = require('../../../app/model/iep');
import ExportTask = require('../../../app/model/task');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Iep: ReturnType<typeof ExportIep>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
  }
}
