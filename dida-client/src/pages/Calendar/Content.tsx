import * as React from "react";
import TaskModal from "@comp/TaskModal";
import { TasksLists, TaskItem, IGlobalTask, ITaskMethods, DateType, IDate } from "MyTypes";
import MonthContent from "./MonthPanel";
import WeekContent from "./WeekPanel";


interface IProps extends ITaskMethods {
    curDate: IDate;
    transition: string;
    curTaskList: TasksLists;
    tasks: IGlobalTask;
    curTask: TaskItem;
    isShowPanel: boolean;
    dateType: DateType;
}
interface IContent {
    type: string;
    timeTitle: string;
    taskItem: TaskItem | object;
    isAllDay: boolean;
}
const initContent: IContent = {
    type: "",
    timeTitle: "",
    taskItem: {
    },
    isAllDay: true,
}

/**
 * 日历容器组件
 */
const Content = function (props: IProps) {
    const [ state, saveState ] = React.useState<IContent>(initContent);
    const { isShowPanel, selectTask, transition, dateType } = props;
    const [ visible, changeVisible] = React.useState(false);
    const { type, timeTitle, taskItem, isAllDay } = state;

    // 选择日期任务 - 进行展示/编辑
    const handleSeletctDate = (task: TaskItem, timeTitle: string, isAllDay = true) => {
        selectTask(task);
        saveState({
            taskItem: task,
            type: "edit",
            timeTitle,
            isAllDay
        });
        changeVisible(true);
    };

    // 新建空白任务 - 进行展示/编辑
    const handleAddDate = (timeTitle: string, isAllDay = true) => {
        saveState({
            taskItem: {
            },
            type: "add",
            timeTitle,
            isAllDay
        });
        changeVisible(true);
    };

    // 关闭任务弹窗
    const handleCloseTaskModel = () => {
        changeVisible(false);
    };

    return <div className="c-content">
        <div className="c-container">
            <div className="c-main">
                {
                    dateType === 'month' ? 
                    <MonthContent
                        handleSeletctDate={handleSeletctDate}
                        handleAddDate={handleAddDate}
                        isShowPanel={isShowPanel}
                        transition={transition}
                        {...props}
                    /> : 
                    <WeekContent
                        handleSeletctDate={handleSeletctDate}
                        handleAddDate={handleAddDate}
                        isShowPanel={isShowPanel}
                        transition={transition}
                        {...props}
                    />
                }
            </div>
        </div>
        <TaskModal
            isAllDay={isAllDay}
            timeTitle={timeTitle}
            visible={visible}
            taskItem={taskItem as TaskItem}
            callParentCancel={handleCloseTaskModel}
            deleteTask={props.deleteTask}
            {...props}
            type={type}
        />
    </div>;
}

export default Content;
