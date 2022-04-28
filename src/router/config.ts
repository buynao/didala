import Account from "@pages/Account"; // 登录/注册
import TaskCenter from "./TaskCenter"; // 个人中心
import TaskComponent from "@pages/Tasks"; // 任务模式
import CalendarComponent from "@pages/Calendar"; // 日历模式
import { IMenuItem } from "MyTypes";


export const menuConfig: IMenuItem[] = [
    {
        text: "今天",
        icon: "fund",
        path: "/task/today",
        count: 0,
        showCount: true,
        active: false,
        type: "today",
        component: TaskComponent,
        exact: true,
    },
    // {
    //     text: "最近",
    //     icon: "project",
    //     path: "/task/week",
    //     showCount: true,
    //     count: 0,
    //     active: false,
    //     type: "week",
    //     component: Week,
    // },
    {
        text: "所有",
        icon: "project",
        path: "/task/all",
        showCount: true,
        count: 0,
        active: false,
        type: "all",
        component: TaskComponent,
        exact: true,
    },
    {
        text: "日历",
        icon: "project",
        path: "/task/calendar",
        showCount: false,
        count: 0,
        active: false,
        type: "list",
        component: CalendarComponent,
        exact: true,
    },
];
export const routeConfig = [
    ...menuConfig,
    {
        path: "/task/today/:id",
        type: "today",
        component: TaskComponent,
        exact: true,
    },
    {
        path: "/task/week/:id",
        type: "week",
        component: TaskComponent,
        exact: true,
    },
    {
        path: "/task/all/:id",
        type: "all",
        component: TaskComponent,
        exact: true,
    },
    {
        path: "/",
        type: "today",
        exact: false,
        component: TaskComponent,
    },
];
export const globalRouteConfig = [
    {
        path: "/",
        component: Account,
        exact: true,
    },
    {
        path: "/task",
        component: TaskCenter,
        exact: false,
    },
    {
        path: "/register",
        component: Account,
        exact: true,
    },
    {
        path: "/login",
        component: Account,
        exact: true,
    },
    {
        path: "/account",
        component: Account,
        exact: true,
    },
]