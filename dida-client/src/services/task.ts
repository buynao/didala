
import { Remote, Store, Model } from "@util/index";
import { RootState, TaskItem } from "MyTypes";

export const getLocalTasks = function () {
    return Store.get("task") ? [Store.get("task")] : [];
};

interface TaskApiResult {
    error: number;
    msg: string;
    list?: TaskItem[]
}

// 获取任务
export const getTask4Api = function (data) {
    return Remote.post("/api/v1/all/task", data.payload)
    .then((result: any) => {
        if (result.error === 0) {
            return [result.list];
        }
        return getLocalTasks();
    }, () => getLocalTasks())
};


// 添加任务
export const add4Api = function (curTask: TaskItem, store: RootState) {
    return Remote.post("/api/v1/batch/task", curTask)
        .then((curTask: TaskItem) => {
            const { tasks } = store;
            console.log(`远程添加：`, JSON.stringify(curTask));
            const taskList = [curTask, ...tasks.all];
            return [taskList, curTask];
        }, () => {
            return getLocalTasks();
        })
};

export const add4Local = function (task: TaskItem) {
    const curTask = Model.task(task);
    let taskList = Store.get("task") || [];
    if (taskList.length) {
        taskList = [curTask, ...taskList];
    } else {
        taskList = [curTask];
    }
    console.log(`本地添加：`, JSON.stringify(curTask));
    Store.add("task", taskList);
    return [taskList, curTask]
};

// 删除任务
export const delete4Api = function(deleteID: string, store: RootState) {
    return Remote.post("/api/v1/delete/task", { id: deleteID })
                .then((result: TaskApiResult) => {
                    if (result.error === 0) {
                        const { tasks } = store;
                        const { all } = tasks;
                        const taskList = all.filter((item: TaskItem) => {
                            if (item._id !== deleteID) {
                                return item;
                            }
                            console.log(`远程删除`, JSON.stringify(item));
                        });
                        return [taskList];
                    }
                })
}

export const delete4Local = function(deleteID: string, store: RootState) {
    const { tasks } = store;
    const { all } = tasks;
    const taskList = all.filter((item: TaskItem) => {
        if (item._id !== deleteID) {
            return item;
        }
        console.log(`本地删除：`, JSON.stringify(item));
    });
    Store.add("task", taskList);
    return [taskList]
}

// 更新任务
export const update4Api = function (curTask: TaskItem, store: RootState) {
    return Remote.post("/api/v1/update/task", curTask)
    .then((result: TaskItem) => {
        console.log(`远程更新：`, JSON.stringify(result));
        const { tasks } = store;
        const { all } = tasks;
        const taskList = all.map((item: TaskItem) => {
            if (item._id === curTask._id) {
                return curTask;
            }
            return item;
        });
        return [taskList, curTask]
    })
}

export const update4Local = function (curTask: TaskItem, store: RootState) {
    const { tasks } = store;
    const { all } = tasks;
    console.log(`本地更新：`, JSON.stringify(curTask));
    const taskList = all.map((item: TaskItem) => {
        if (item._id === curTask._id) {
            return curTask;
        }
        return item;
    });
    Store.add("task", taskList);
    return [taskList, curTask]
};

// 改变任务
export const changeTask = function(curTask: TaskItem, store: RootState) {
    const { tasks } = store;
    const filterTasks = tasks.all.map((item: TaskItem) => {
        if (item._id === curTask._id) {
            return curTask;
        }
        return item;
    });
    const nextTasks = [filterTasks, curTask];
    return nextTasks;
}

// 选择任务
export const selectTask4Api = function(newCurTask: TaskItem, store: RootState) {
    const { tasks } = store;
    const { curTask, hasChangeTask } = tasks;
    if (hasChangeTask && curTask) { // 任务有修改，且未保存
        Remote.post("/api/v1/update/task", curTask);
    }
    return newCurTask;
}

export const selectTask4Local = function(newCurTask: TaskItem, store: RootState) {
    const { tasks } = store;
    const { all, hasChangeTask, curTask } = tasks;
    if (hasChangeTask && curTask) { // 任务有修改，且未保存
        const taskList = all.map((item: TaskItem) => {
            if (item._id === curTask._id) {
                return curTask;
            }
            console.log(`本地更新：`, JSON.stringify(item));
            return item;
        });
        Store.add("task", taskList);
    }
    return newCurTask;
}