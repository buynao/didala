
import { RootEpic } from "MyTypes";
import { timer, of } from "rxjs";
import { ofType } from "redux-observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { map } from "rxjs/operators/map";
import { switchMap } from "rxjs/operators/switchMap";
import { takeUntil } from "rxjs/operators/takeUntil";
import { debounce } from "rxjs/operators/debounce";
import { pluck } from "rxjs/operators/pluck";
import { filter } from "rxjs/operators/filter";
import { concatMap } from 'rxjs/operators/concatMap';
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { getType, isActionOf } from "typesafe-actions";
import * as actions from "@actions/task";
import { resetTaskAsync, addTaskAsync, deletgeTaskAsync, upateTaskAsync } from "@actions/task";
import { IGlobalTask, TaskItem } from "MyTypes";
import { taskResetOperator, roleMap } from "@operator/index"; // 自定义操作符

// 1. 获取任务列表
export const taskEpic: RootEpic = (
        action$,
        store$,
        { task }
) => action$.pipe(
    filter(isActionOf(resetTaskAsync.request)),
    roleMap(store$,
        (action) => fromPromise(task.getTask4Api(action)),
        () => task.getLocalTasks()
    ),
    taskResetOperator(),
    map((result: IGlobalTask) => resetTaskAsync.success(result)),
)

// 2. 添加任务
export const addTaskEpic: RootEpic = (
    action$,
    store$,
    { task }
) => action$.pipe(
        filter(isActionOf(addTaskAsync.request)),
        roleMap(store$,
            (data) => fromPromise(task.add4Api(data.payload, store$.value)), 
            (data) => task.add4Local(data.payload),
        ),
        taskResetOperator(),
        map((result: IGlobalTask) => addTaskAsync.success(result)),
    );

// 3. 删除任务
export const deleteTaskEpic: RootEpic = (
    action$,
    store$,
    { task }
) => action$.pipe(
        filter(isActionOf(deletgeTaskAsync.request)),
        roleMap(store$,
            (action) => fromPromise(task.delete4Api(action.payload, store$.value)),
            (action) => task.delete4Local(action.payload, store$.value)
        ),
        taskResetOperator(),
        map((result: IGlobalTask) => deletgeTaskAsync.success(result)),
    );

// 4. 更新任务
export const updateTaskEpic: RootEpic = (
    action$, 
    store$, 
    { task }
) => action$.pipe(
        filter(isActionOf(upateTaskAsync.request)),
        roleMap(store$,
            (data) => fromPromise(task.update4Api(data.payload, store$.value)),
            (data) => task.update4Local(data.payload, store$.value)
        ),
        taskResetOperator(),
        map((result: IGlobalTask) => upateTaskAsync.success(result)),
    );

// 5. 选择任务并关闭自动保存
export const selectTaskEpicAndAutoSaveEnable: RootEpic = ( 
    action$, 
) => {
    return action$.pipe(
        filter(isActionOf(actions.selectTaskAutoSave)),
        concatMap((action) => of(actions.selectTaskAction(action.payload), actions.autoSaveDisableAction()))
    )
};

// 6. 修改任务并开启自动保存
export const changeTaskEpicAndAutoSaveDisable: RootEpic = ( 
    action$, 
) => {
    return action$.pipe(
        filter(isActionOf(actions.changeTaskAutoSave)),
        concatMap((action) => of(actions.changeTaskAction(action.payload), actions.autoSaveEnableAction()))
    )
};

// 7. 选择当前任务
export const selectTaskEpic: RootEpic = ( 
    action$, 
    store$, 
    { task }
) => {
    return action$.pipe(
        filter(isActionOf(actions.selectTaskAction)),
        roleMap(store$,
            (data) => task.selectTask4Api(data.payload, store$.value),
            (data) => task.selectTask4Local(data.payload, store$.value)
        ),
        map((curtask: TaskItem) => actions.receiveCurTaskAction(curtask)),
    );
};

// 8. 任务修改
export const changeTaskEpic: RootEpic = (
    action$, 
    store$, 
    { task }
) => action$.pipe(
        filter(isActionOf(actions.changeTaskAction)),
        map((data) => task.changeTask(data.payload, store$.value)),
        taskResetOperator(),
        map((result: IGlobalTask) => {
            console.log(result);
            return resetTaskAsync.success(result);
        }),
    );

// 9. 开启自动保存
export const autoSaveTaskEpic: RootEpic = (
    action$, 
    store$, 
    { task }
) => {
    const TASKS = "tasks";
    const CURTASK = "curTask";
    return action$.pipe(
        filter(isActionOf(actions.autoSaveEnableAction)),
        debounce(() => timer(10000)),
        switchMap(() =>
            store$.pipe(
                pluck(TASKS, CURTASK),
                distinctUntilChanged(),
                roleMap(store$,
                    (curTask) => task.update4Api(curTask, store$.value),
                    (curTask) => task.update4Local(curTask, store$.value)
                ),
                takeUntil(action$.pipe(
                    ofType(getType(actions.autoSaveDisableAction)),
                )),
            ),
        ),
        map(() => actions.autoSaveDisableAction())
    );
  };
