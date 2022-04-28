import { createReducer } from "typesafe-actions";
import { combineReducers } from 'redux';
import { IGlobalTask } from "MyTypes";
import { resetTaskAsync, addTaskAsync, deletgeTaskAsync, upateTaskAsync } from "@actions/task";
import * as actions  from "@actions/task";

const reduce = combineReducers<IGlobalTask>({
    all: createReducer([])
    .handleAction([
        resetTaskAsync.success,
        addTaskAsync.success,
        deletgeTaskAsync.success,
        upateTaskAsync.success
    ], (state, action) => action.payload.all )
    .handleAction([
        actions.cleanTaskAction,
        resetTaskAsync.failure
    ], () => []),

    today: createReducer([])
    .handleAction([
        resetTaskAsync.success,
        addTaskAsync.success,
        deletgeTaskAsync.success,
        upateTaskAsync.success
    ], (state, action) => action.payload.today)
    .handleAction([
        actions.cleanTaskAction,
        resetTaskAsync.failure
    ], () => []),

    curTask: createReducer({})
    .handleAction([
        actions.receiveCurTaskAction,
        addTaskAsync.success,
        upateTaskAsync.success,
        resetTaskAsync.success,    
        deletgeTaskAsync.success,
    ], (state, action) => action.payload.curTask ? action.payload.curTask :action.payload
    ).handleAction([
        actions.cleanTaskAction,
    ], () => {}),

    hasChangeTask: createReducer(false)
    .handleAction(actions.autoSaveEnableAction, () => true)
    .handleAction([
        actions.cleanTaskAction,
        actions.autoSaveDisableAction
    ], () => false),
});

export const dispatchProps = {
    addTask: addTaskAsync.request,
    deleteTask: deletgeTaskAsync.request,
    updateTask: upateTaskAsync.request,
    selectTask: actions.selectTaskAction,
    changeTask: actions.changeTaskAction,
    selectTaskAutoSave: actions.selectTaskAutoSave,
    changeTaskAutoSave: actions.changeTaskAutoSave
}

export default reduce;
