import { createAction, createCustomAction, createAsyncAction } from "typesafe-actions";
import { IGlobalTask, TaskItem } from "MyTypes";

// 1. 获取任务列表
export const resetTaskAsync = createAsyncAction(
    'RESET_TASK/REQUEST',
    'RESET_TASK/SUCCESS',
    'RESET_TASK/ERROR'
)<any, IGlobalTask, IGlobalTask>();

// 2. 添加任务
export const addTaskAsync = createAsyncAction(
    'ADD_TASK/REQUEST',
    'ADD_TASK/SUCCESS',
    'ADD_TASK/ERROR'
)<TaskItem, IGlobalTask, IGlobalTask>();

// 3. 删除任务
export const deletgeTaskAsync = createAsyncAction(
    'DELETE_TASK/REQUEST',
    'DELETE_TASK/SUCCESS',
    'DELETE_TASK/ERROR'
)<string, IGlobalTask, IGlobalTask>();

// 4. 更新任务
export const upateTaskAsync = createAsyncAction(
    'UPDATE_TASK/REQUEST',
    'UPDATE_TASK/SUCCESS',
    'UPDATE_TASK/ERROR'
)<TaskItem, IGlobalTask, IGlobalTask>();

// 5. 选择任务并关闭自动保存
const SELECT_TASK_AND_OFF_AUTO_SAVE = "SELECT_TASK/DISABLE_AUTO_SAVE";
export const selectTaskAutoSave = createCustomAction(SELECT_TASK_AND_OFF_AUTO_SAVE,
    (taskInfo: TaskItem) => ({
        payload: taskInfo,
    })
);
// 6. 修改任务并开启自动保存
const SELECT_TASK_AND_ON_AUTO_SAVE = "CHANGE_TASK/ENABLE_AUTO_SAVE";
export const changeTaskAutoSave = createCustomAction(SELECT_TASK_AND_ON_AUTO_SAVE,
    (taskInfo: TaskItem) => ({
        payload: taskInfo,
    })
);

// 7. 选择当前任务
const SELECT_TASK = "SELECT_TASK";
export const selectTaskAction = createCustomAction(SELECT_TASK,
    (taskInfo: TaskItem) => ({
        payload: taskInfo,
    })
);
// 响应当前任务
const RECEIVE_SELECT_TASK = "RECEIVE_SELECT_TASK";
export const receiveCurTaskAction = createCustomAction(RECEIVE_SELECT_TASK,
    (taskInfo: TaskItem) => ({
        payload: taskInfo,
    })
);

// 8. 任务修改
const CHANGE_TASK_CONTENT = "CHANGE/TASK";
export const changeTaskAction = createCustomAction(CHANGE_TASK_CONTENT,
    (taskInfo: TaskItem) => ({
        payload: taskInfo,
    })
);

// 9. 开启启动保存
const AUTO_SAVE_ENABLE = "AUTO_SAVE_ENABLE/TASK";
const AUTO_SAVE_DISABLE = "AUTO_SAVE_DISABLE/TASK";
export const autoSaveEnableAction = createAction(AUTO_SAVE_ENABLE)();
export const autoSaveDisableAction = createAction(AUTO_SAVE_DISABLE)();

// 10. 重置任务
const CLEAN_TASK = "CLEAN/TASK";
export const cleanTaskAction = createAction(CLEAN_TASK)();

