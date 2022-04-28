import * as React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import TaskItemComponent from "./TaskItem";
import { TaskItem, ITaskMethods } from "MyTypes";

interface IProps extends ITaskMethods {
    tasksList: TaskItem[];
    type: string;
}

const TaskList = function (props: IProps) {
    const [ activeId, saveActiveId ] = React.useState("");
    const { selectTaskAutoSave, tasksList = [], deleteTask, updateTask, type } = props;

    const handleSelectTask = (task: TaskItem) => {
        saveActiveId(task._id);
        selectTaskAutoSave(task);
    };

    return <Scrollbars><div className="tasks-list">
            <div className="task-ul-list .antiscroll-wrap">
                <div className="task-list-scroll">
                    <div className="task-list-content">
                        <section className="section">
                            <ul style={{ height: `${tasksList ? tasksList.length * 40 : 0}px` }}>
                                {
                                    tasksList ? tasksList.map((item: TaskItem) => {
                                        return <TaskItemComponent
                                            type={type}
                                            key={item._id}
                                            task={item}
                                            active={item._id === activeId}
                                            updateTask={updateTask}
                                            handleSelectTask={handleSelectTask}
                                            deleteTask={deleteTask}
                                            {...props}
                                        />;
                                    }) : null
                                }
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div></Scrollbars>;
}

export default TaskList;
