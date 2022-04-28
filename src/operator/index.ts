import { Observable } from "rxjs/Rx";
import { RootEpic } from "MyTypes";
import { ActionsObservable } from "redux-observable";
import { TaskItem, TasksLists } from "MyTypes";


type curTask = TaskItem;
type taskResult = [ TasksLists, curTask? ]

/**
 * 该方法用于将数据转换：
 * 
 * 符合页面渲染的数据模型 { all, today, curTask, ... }
 *
*/
export const taskResetOperator = () => (source) => Observable.create((subscriber: any) => {
    const subscription = source.subscribe(
        (result: taskResult) => {
            const [ tasklist = [], curTask = {} ] = result;
            // 任务数组
            const todayTasks: TasksLists = [];
            // const weekTasks: TasksLists = [];
            // const monthTasks: TasksLists = [];

            // 当前日期
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const sToday = +new Date(`${year}-${month}-${day} 00:00`);
            const eToday = +new Date(`${year}-${month}-${day} 24:00`);
            // const sWeek = sToday - 3 * 1000 * 60 * 60 * 24;
            // const eWeek = eToday + 3 * 1000 * 60 * 60 * 24;
            tasklist.forEach((item: TaskItem) => {
                const curTime = +new Date(item.startTime);
                if (curTime > sToday && curTime < eToday) {
                    // 今天
                    todayTasks.push(item);
                    // weekTasks.push(item);
                }
                    // } else if (curTime > sWeek && curTime < eWeek) {
                //     // 当周
                //     weekTasks.push(item);
                // }
            });
            subscriber.next({
                all: tasklist,
                // week: weekTasks,
                today: todayTasks,
                // month: monthTasks,
                curTask: curTask as TaskItem,
            });
        },
    );
    return subscription;
});

/**
 * 根据用户角色处理副作用
 * 
 * const roleMap = (store, callback4register, callback4visitor);
 * 
 * store => 全局数据
 * 
 * 当角色为游客时，执行callback4visitor进行数据处理
 * 
 * 当角色为注册用户时，执行callback4register进行数据处理
*/
export function roleMap<T> (store, callback4register: (data: T) => any, callback4visitor: (data: T) => any) {
    return (source: Observable<T>) =>
    Observable.create(subscriber => {
        return source.subscribe({
            next(data){
                const state = store.value;
                const { role } = state.account; // 获取当前角色
                try {
                    if (role === 'visitor') {
                        subscriber.next(callback4visitor(data));
                    } else {
                        const callResult = callback4register(data);
                        if (callResult.subscribe){
                            callResult.subscribe((data) => {
                                subscriber.next(data);
                            });
                        } else {
                            subscriber.next(callResult);
                        }
                    }   
                } catch (error) {
                    subscriber.error(error)
                }
            },
            error(err) {subscriber.error(err)},
            complete() {subscriber.complete()}
        })
    })
}

/**
 * epic组合调用
 * 
*/
export function forkEpic(
    epicFactory: RootEpic,
    state$,
    actions,
    services
){
    const actions$ = ActionsObservable.of(actions);
    return epicFactory(actions$, state$, services)
}