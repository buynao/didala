// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportIep = require('../../../app/controller/iep');
import ExportTask = require('../../../app/controller/task');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    iep: ExportIep;
    task: ExportTask;
    user: ExportUser;
  }
}
