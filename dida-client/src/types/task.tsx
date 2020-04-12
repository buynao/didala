
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
    export interface DateBodyProps {
        curDate: IDate;
        tasks: IGlobalTask
        handleAddDate: any;
        handleSeletctDate: any;
    }
}