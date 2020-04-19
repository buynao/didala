
declare module 'MyTypes' {
    // 任务基础字段
    export interface TaskItem {
        title: string;
        content: string;
        startTime: string;
        color: string;
        name: string;
        _id: string;
        status: number;
    }

    export type TasksLists  = TaskItem[];

    // 全局任务
    export interface IGlobalTask {
        all?: TasksLists;
        month?: TasksLists;
        curTask?: TaskItem;
        hasChangeTask?: boolean;
        today?: TasksLists;
        week?: TasksLists;
    }

    export interface ITaskMethods {
        addTask?: (data: TaskItem) => void;
        deleteTask?: (id: string) => void;
        updateTask?: (data: TaskItem) => void;
        selectTask?: (data: TaskItem) => void;
        changeTask?: (data: TaskItem) => void;
        selectTaskAutoSave?: (data: TaskItem) => void;
        changeTaskAutoSave?: (data: TaskItem) => void;
        getTaskList?: (data: any) => void;
    }

    export type DateType = 'month' | 'week' | 'today';

    export type IDate = {
        year: number,
        month: number,
        day: number;
    }

    /**
     * curDate：当前的日期
     * tasks: 汇总任务列表
     * handleAddAate: 添加日期
     * handleSeletctDate: 选择日期任务进行展示/编辑
    */
    export interface DateBodyProps {
        curDate: IDate;
        tasks: IGlobalTask;
        handleAddDate: any;
        handleSeletctDate: any;
    }
    export interface IDateBody {
        date: string;
        year: number;
        month: number;
        day: number;
        task: TaskItem[];
    }
}