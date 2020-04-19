import * as React from "react";
import { TaskItem, IGlobalTask, ITaskMethods } from "MyTypes"
import Modal from "antd/es/modal";
import { DeleteIcon } from "@icons";
require("./style.less");

interface IProps extends ITaskMethods {
    type: string;
    timeTitle: string;
    visible: boolean;
    taskItem: TaskItem;
    callParentCancel: () => void;
    tasks: IGlobalTask;
    curTask: TaskItem;
}
type typeValue = "content" | "title";

function TaskModal (props: IProps) {
    const { updateTask, callParentCancel, timeTitle, type, addTask, deleteTask, visible, taskItem } = props;
    console.log(taskItem);
    const [prevTask, setPrevTask] = React.useState({
        content: "",
        title: "",
    } as TaskItem);
    const { title, content, _id } =  prevTask;

    // 取最新的数据
    if (taskItem._id !== _id){
        setPrevTask(taskItem);
    }

    const hadndleChange = (e: React.FormEvent<HTMLInputElement| HTMLTextAreaElement>, type: typeValue) => {
        setPrevTask({
            ...prevTask,
            [type]: e.currentTarget.value
        })
    }

    const onOk = React.useCallback(() => {
        if (type === 'edit') {
            updateTask({
                ...prevTask as TaskItem,
            });
        } else {
            if (title || content) {
                addTask({
                    title,
                    content,
                    startTime: timeTitle
                } as TaskItem);
                setPrevTask({
                    title: '',
                    content: '',
                } as TaskItem);
            }
        }
        callParentCancel();
    }, [prevTask]);

    const handleDeleteTask = () => {
        deleteTask(_id)
        callParentCancel();
    }

    return (<Modal
            footer={
                type === 'edit' ?
                <DeleteIcon
                    className="modal-delete-icon"
                    onClick={handleDeleteTask}
                /> : null
            }
            title={timeTitle}
            visible={visible}
            closable={false}
            onCancel={onOk}
            onOk={onOk}
            destroyOnClose={true}
            className="task-modal"
        >
        <input
            value={title}
            className="task-input"
            type="text"
            onChange={(e) => hadndleChange(e, "title")}
            placeholder={`准备做点什么？`}
        />
        <div className="task-content">
        <textarea
            className="task-content-text"
            placeholder="描述"
            value={content}
            onChange={(e) => hadndleChange(e, "content")}
        >{content}</textarea>
    </div>
    </Modal>)
}
export default TaskModal;