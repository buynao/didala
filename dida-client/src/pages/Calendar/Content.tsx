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


/**
 * 日历容器组件
 * 
 */
const Content = function (props: IProps) {
    const [state, saveState ] = React.useState({
        type: "",
        timeTitle: "",
        taskItem: {},
    });
    const { isShowPanel, selectTask, transition, dateType } = props;
    const [visible, changeVisible] = React.useState(false);
    const { type, timeTitle, taskItem } = state;

    // 选择日期任务
    const handleSeletctDate = (task, timeTitle) => {
        selectTask(task);
        saveState({
            taskItem: task,
            type: "edit",
            timeTitle,
        });
        changeVisible(true);
    };

    // 新建空白任务
    const handleAddDate = (timeTitle) => {
        saveState({
            taskItem: {},
            type: "add",
            timeTitle,
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
