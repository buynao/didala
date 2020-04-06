import * as React from "react";
import { IGlobalTask, ITaskMethods } from "MyTypes";

const styles = require("./style.less");
const emptyTaskPic = require("./img/task.png").default;

interface IProps extends ITaskMethods {
    tasks: IGlobalTask;
}
const RightView = function (props: IProps) {
    const { tasks } = props;
    const { curTask } = tasks;

    const hadndleChange = function (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) {
        const { tasks, changeTaskAutoSave } = props;
        const { curTask } = tasks;
        curTask[type] = e.currentTarget.value;
        changeTaskAutoSave(curTask);
    }

    return  <div className="right-view">
    <div className="detail-view">
        {
            (!curTask || !curTask._id) ?
            <div className="detail-empty-img">
                <img className="task-inner-img" src={emptyTaskPic} alt="查看任务吧~" />
            </div>
            :
            <div className="task-inner-view">
                <div className="task-title">
                    <input
                        className="task-title-input"
                        type="text"
                        placeholder="准备做什么"
                        onChange={(e) => hadndleChange(e, "title")}
                        value={curTask.title}
                    />
                </div>
                <div className="task-content">
                    <textarea
                        className="task-content-text"
                        placeholder="描述"
                        value={curTask.content}
                        onChange={(e) => hadndleChange(e, "content")}
                    >{curTask.content}</textarea>
                </div>
            </div>
        }
    </div>
</div>;
}

export default RightView;
