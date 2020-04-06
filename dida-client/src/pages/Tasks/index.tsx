import * as React from "react";
import { connect } from "react-redux";
import { dispatchProps } from "@reducers/task";
import AddTask from "./AddTask";
import TaskList from "./TaskLIst";
import RightView from "./RightView";
import { titlePrefix } from "@util/help";

import { TaskItem, IGlobalTask, ITaskMethods } from "MyTypes";

const styles = require("./style.less");

type TypeDesc = "today" | "all";

interface IProps extends ITaskMethods {
    curTask: TaskItem;
    tasks: IGlobalTask;
    type: TypeDesc;
}
const TASK_DESC = {
    today: "今天",
    all: "所有de",
};

const Task = function(props: IProps) {
    const { addTask, tasks, deleteTask, updateTask, selectTaskAutoSave, changeTaskAutoSave, type } = props;
    const tasksList = tasks[type];

    React.useEffect(() => {
        document.title = titlePrefix(TASK_DESC[type]);
    }, [type]);

    return (<div>
        <div className="task-list-view">
            <div className="tl-bar">
                <div className="line-left">
                    <h5 className="text-primary tl-des select-enabled">{TASK_DESC[type]}</h5>
                </div>
            </div>
            <AddTask
                desc={TASK_DESC[type]}
                addTask={addTask}
                tasks={tasks}
            />
            <TaskList
                type={type}
                tasksList={tasksList}
                deleteTask={deleteTask}
                updateTask={updateTask}
                selectTaskAutoSave={selectTaskAutoSave}
            />
        </div>
        <RightView
            tasks={tasks} // 不能传tasks.curTask ，由于感知不到嵌套关系，子组件无法重新渲染
            changeTaskAutoSave={changeTaskAutoSave}
            updateTask={updateTask}
        />
    </div>);
}

function mapStateToProps(state: any): any {
    return {
        ...state,
    };
}
export default connect(mapStateToProps, dispatchProps)(Task);
