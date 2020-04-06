// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTask = require('../../../app/model/task');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
  }
}
