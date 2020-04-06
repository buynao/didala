import * as React from "react";
import { useHistory } from 'react-router-dom';
import Checkbox from "antd/es/checkbox";
import Popconfirm from "antd/es/popconfirm";
import { TaskItem } from "MyTypes";
import { DeleteIcon } from "@icons";
import { fixDate } from "@util/help";
interface IPrpops {
    key: any;
    task: TaskItem;
    type: string;
    active: boolean;
    deleteTask: (id: string) => void;
    handleSelectTask: (TaskItem: TaskItem) => void;
    updateTask: (TaskItem: TaskItem) => void;
}

/*
* 时间戳转换成日期
**/
const date2pretty = (date: string | Date) => {
  const cDate = new Date();
  const cYear = cDate.getFullYear();
  const cMonth = cDate.getMonth() + 1;
  const cDay = cDate.getDate();
  const tdate = new Date(date);
  const tYear = tdate.getFullYear();
  const tMonth = tdate.getMonth() + 1;
  const tDay = tdate.getDate();
  const cstr = `${cYear}-${fixDate(cMonth)}-${fixDate(cDay)}`;
  const tstr = `${tYear}-${fixDate(tMonth)}-${fixDate(tDay)}`;
  if (cstr === tstr) {
    return "今天";
  }
  if (cYear === tYear && cMonth === tMonth) {
    if (cDay > tDay) {
      return {
        1: "昨天",
        2: "前天",
      }[cDay - tDay] || <span className="old">{tstr}</span>;
    }
    if (tDay > cDay) {
      return {
        1: "明天",
        2: "后天",
      }[tDay - cDay] || <span className="old">{tstr}</span>;
    }
  }
  return <span className="old">{tstr}</span>;
}

const TaskItem = function(props: IPrpops) {
    const { deleteTask, task, handleSelectTask, type, updateTask, active } = props;
    const history = useHistory();
    const { title, status, startTime } = task;
    const taskId = task._id;
    const selectTask = () => {
      history.push({ pathname : `/task/${type}/${taskId}`});
      handleSelectTask(task);
    }

    const handleChangeUpdateCompleted = () => {
      updateTask({
        ...task,
        status: Number(!task.status),
      });
    }

    return (<li className={`task ${active ? "active" : ""}`}>
    <div className="t-line top" />
    <div className="l-task-bg">
      <div className="l-task">
        <div className="t-inner task-inner">
          <span className="drag" />
          <Checkbox
            className={`t-check`}
            checked={!!status}
            onChange={handleChangeUpdateCompleted}
          />
          <div className="tips">
            <span className="tip t-date">
               {date2pretty(startTime)}
            </span>
          </div>
          <div
            className="title-wrap"
            onClick={selectTask}
          >
            <div
              className={`title ${status ? "active" : ""}`}
              suppressContentEditableWarning={true}
              contentEditable={true}
            >{title}</div>
          </div>
        </div>
        <div className="t-menu-toggle">
          <Popconfirm
            className="t-delete"
            placement="right"
            title="删除这条任务"
            onConfirm={() => deleteTask(taskId)}
            okText="yes"
            cancelText="no"
          >
            <span className="fuckAntd"><DeleteIcon /></span>
          </Popconfirm>
        </div>
      </div>
    </div>
    <div className="t-line bottom" />
</li>);
}


export default TaskItem;
