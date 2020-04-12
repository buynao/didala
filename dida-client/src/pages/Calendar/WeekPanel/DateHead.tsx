import * as React from "react";
import { IGlobalTask, TasksLists, TaskItem, IDate } from "MyTypes";
import { addZero, moveDate } from "@util/help";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

interface DateHeadProps {
    curDate: IDate;
    tasks: IGlobalTask
    handleAddDate: any;
    handleSeletctDate: any;
}

interface IDateBody {
    date: string;
    year: number;
    month: number;
    day: number;
    task: TaskItem[];
}

interface DayForTask {
    [index: string]: [] | TaskItem[]
}
function buildDateBody(curDate: IDate, tasks) :IDateBody[] {
    const lists = [];
    const { year, month, day } = curDate;
    const time = new Date(`${year}-${month}-${day}`);
    const curDay = time.getDay() - 1; // 当周第一天，星期几
    const WEEK_LEN = 7;
    let i = curDay < 0 ? 6 : curDay; // [0：周一，1：周二，2：周三, ...]
    const startDate = moveDate(time, i)
    const startTime = `${startDate.year}-${addZero(startDate.month)}-${addZero(startDate.day)}`;
    let k = 0;
    while(k < WEEK_LEN) {
        const date = moveDate(startTime, 0, k++);
        const dateStr = `${date.year}-${addZero(date.month)}-${addZero(date.day)}`;
        lists.push({
            date: dateStr,
            year: date.year,
            month: date.month,
            day: date.day,
            task: tasks[dateStr] || [],
        });
    }

    return lists;
}
function getDateKey(date: string | Date) {
    var curDate = new Date(date);
    const month = curDate.getMonth() + 1;
    const day = curDate.getDate();
    return `${curDate.getFullYear()}-${addZero(month)}-${addZero(day)}`;
}
/**
 * 根据当前日历日期生产任务数据模型
 * 
 * @param tasksList 
 */
function buildDayForTasks(tasksList: TasksLists) : DayForTask {
    const data = {};
    if (tasksList && tasksList.length) {
        tasksList.forEach((item) => {
            const dateKey = getDateKey(item.startTime);
            data[dateKey] = data[dateKey] || [];
            data[dateKey].push(item);
        });
        return data;
    }
    return data;
}
/**
 * 日期头部栏组件
 * 
 * | 周一 | 周二 |...| 周日 |
 * |  1   |  2  |...|   7  |
 */
const DateHead: React.FC<DateHeadProps> = React.memo((props) => {
    const DAY_LABES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const { curDate, tasks, handleAddDate, handleSeletctDate } = props;
    const tasksList = buildDayForTasks(tasks.all);
    const lists = buildDateBody(curDate, tasksList);

    return <><table className="top-container-week wk-weektop">
        <tbody>
            <tr className="wk-daynames">
                <th scope="col" className="wk-tzlabel"></th>
                    {lists.map((text, index) => {
                        const dayCls = classNames("c-day-label", {
                            "c-day-week": index > 4
                        });
                        return <th key={index} className={dayCls}>
                            <div className="wk-dayname">
                                <p className="wk-daylink wk-daylink-name wk-daylink-holiday">
                                    <span>{DAY_LABES[index]}</span>
                                </p>
                                <p className="wk-daylink wk-daylink-number">
                                    <span className="c-solar-day">{text.day}</span>
                                </p>
                            </div>
                        </th>;
                    })}
                <th scope="col" className="wk-scroll-label"></th>
            </tr>
        </tbody>
    </table>
    <div className="wk-allday">
        <div className="tg-time-all"><span></span></div>
        <div className="tg-allday-wrapper">
            <div className="tg-allday">
                <div className="bg">
                    <table>
                        <tbody>
                            <tr>
                                {lists.map((item, index) => {
                                    return <td key={index}                                 onClick={() => {
                                        handleAddDate(item.date)
                                    }} className="all-day-item" date-date={item.date}></td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="content-wrapper antiscroll-wrap">
                    <div className="content-skeleton">
                        <table>
                            <tbody>
                                <tr>
                                {lists.map((item, idx) => {
                                    return <td key={idx} className="c-titlebar" data-date={item.date}>
                                        <div className="c-task-list">
                                        <Scrollbars>
                                            {
                                                item.task.map((T) => {
                                                    const cls = `c-task ${T.status === 1 ? "finished" : "unfinished"}`;
                                                    return (<div
                                                            key={T._id}
                                                            className={cls}
                                                            onClick={() => handleSeletctDate(T, item.date)}
                                                        >
                                                        <div className="c-task-inner">
                                                            <div className="c-task-title">
                                                                {T.title}
                                                            </div>
                                                        </div>
                                                    </div>);
                                                })
                                            }
                                            </Scrollbars>
                                        </div>    
                                    </td>;
                                })}</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="dragArea">
            <div className="dragger"></div>
        </div>
    </div>
    </>;
});

export default DateHead;