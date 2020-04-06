import * as React from "react";
import { TaskItem, IGlobalTask, ITaskMethods } from "MyTypes"
import Modal from "antd/es/modal";
import { DeleteIcon } from "@icons";
require("./style.less");

interface IProps extends ITaskMethods {
    type: string;
    timeTitle: string;
    visible: boolean;
    taskInfo: TaskItem;
    callParentCancel: () => void;
    tasks: IGlobalTask;
    curTask: TaskItem;
}

class TaskModal extends React.Component<IProps, any> {
    static getDerivedStateFromProps(nextProps, state) {
        // 弹窗关闭状态 - "表单"编辑状态关闭
        if (!nextProps.visible) return { onEditing: false };

        if (!state.onEditing) {
            // 编辑 -  "表单"赋值
            if (nextProps.type === 'edit') {
                return {
                    onEditing: true,
                    ...nextProps.taskInfo,
                };
            }

            // 新增 - "表单"置空
            return {
                onEditing: true,
                title: "",
                content: ""
            }
        } else {
            // 编辑状态：
            // 组件内部调用setState，组件更新前，会再次调用getDerivedStateFromProps方法
            // 此处添加判断：props的值应为初始值状态，所以以setState的值为准。
            // 参考：https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops
            if (nextProps.taskInfo.title !== state.title || 
                nextProps.taskInfo.content !== state.content) {
                return {
                    ...state
                };
            }
            return {
                ...state
            };
        }
        
    }
    public constructor(props: IProps) {
        super(props);

        this.state = {
            ...props.taskInfo,
        }
        this.hadndleChange = this.hadndleChange.bind(this);
        this.onOk = this.onOk.bind(this);
        this.delete = this.delete.bind(this);
    }
    public hadndleChange(type: string, e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            [type]: e.currentTarget.value
        })
    }
    public onOk() {
        const { updateTask, callParentCancel, timeTitle, type, addTask } = this.props;
        const { title, content } = this.state;
        if (type === 'edit') {
            updateTask({
                ...this.state as TaskItem,
            });
        } else {
            if (title || content) {
                addTask({
                    title,
                    content,
                    startTime: timeTitle
                } as TaskItem);
            }
        }
        callParentCancel();
    }
    public delete() {
        const {  deleteTask, callParentCancel } = this.props;
        const { _id } = this.state;
        deleteTask(_id)
        callParentCancel();
    }
    public render() {
        const { timeTitle, visible, type } = this.props;
        const { title, content } = this.state;
        return (<Modal
                footer={
                    type === 'edit' ?
                    <DeleteIcon
                        className="modal-delete-icon"
                        onClick={this.delete}
                    /> : null
                }
                title={timeTitle}
                visible={visible}
                closable={false}
                onCancel={this.onOk}
                onOk={this.onOk}
                destroyOnClose={true}
                className="task-modal"
            >
            <input
                value={title}
                className="task-input"
                type="text"
                onChange={this.hadndleChange.bind(this, "title")}
                placeholder={`准备做点什么？`}
            />
            <div className="task-content">
            <textarea
                className="task-content-text"
                placeholder="描述"
                value={content}
                onChange={this.hadndleChange.bind(this, "content")}
            >{content}</textarea>
        </div>
        </Modal>);
    }
}

export default TaskModal;