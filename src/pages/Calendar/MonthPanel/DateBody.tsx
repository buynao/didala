import * as React from "react";
import { TasksLists, TaskItem, DateBodyProps } from "MyTypes";
import { buildDayForTasks, addZero } from "@util/help";
import { Scrollbars } from "react-custom-scrollbars";

interface IDateBody {
    date: string;
    year: number;
    month: number;
    day: number;
    task: TaskItem[];
}
type DateBodyLists = IDateBody[][];

/**
 * 日期列表组件
 * 
 * | 1 | 2 |...| 7 |
 * | 8 | 9 |...| 31|
 */
const DateBody = (props: DateBodyProps) : JSX.Element => {
    // 暂时使用task.all 渲染日历列表
    const { curDate, tasks, handleAddDate, handleSeletctDate } = props;
    const tasksList = buildDayForTasks(tasks.all);
    const lists = buildDateBody(curDate.year, curDate.month, tasksList);

    return (<>
        {lists.map((row, index) => {
        return (
        <div
            key={index}
            className="c-row"
            style={{height: `${(window.innerHeight - 30 - 52) / 5}px`}}
        >
            <div className="contetnt-bg">
            <table>
                    <tbody>
                        <tr>
                        { row.map((item, idx) => {
                            return <td key={idx}
                                className="c-date"
                                onClick={() => {
                                    handleAddDate(item.date)
                                }}
                                data-date={item.date}
                            />
                        })
                        }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="content-skeleton">
                <table>
                    <tbody>
                        <tr>
                        { row.map((item, idx) => {
                            return <td key={idx} className="c-titlebar" data-date={item.date}>
                                <div className="c-title text-info">
                                    <span className="c-solar">{item.day}</span>
                                </div>
                                <div className="c-task-list">
                                    {/* <Scrollbars> */}
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
                                    {/* </Scrollbars> */}
                                </div>    
                            </td>;
                        })
                        }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
        })
    }</>)
}

interface DayForTask {
    [index: string]: [] | TaskItem[]
}

/**
 * 根据任务数据模型生成方便渲染的列表数据结构
 * 
 * @param year 
 * @param month 
 * @param tasks 
 */
function buildDateBody(year: number, month: number, tasks: DayForTask) : DateBodyLists {
    const lists = [ [] ];
    const curDay = new Date(`${year}-${month}`).getDay() - 1; // 当月第一天，星期几
    const curDayLen = new Date(year, month, 0).getDate(); // 当月多少天
    const WEEK_LEN = 7;
    let i = curDay < 0 ? 6 : curDay; // [0：周一，1：周二，2：周三, ...]

    // 补前
    const beforeMonth = month - 1 === 0 ? 12 : month - 1;
    const beforeYear = beforeMonth === 12 ? year - 1 : year;
    const beforeDayLen = new Date(beforeYear, beforeMonth, 0).getDate();
    let k = 0;
    for (; i > 0; i--, k++) {
        const beforeDate =  `${beforeYear}-${addZero(beforeMonth)}-${addZero(beforeDayLen - i + 1)}`;
        lists[0].push({
            date: beforeDate,
            year: beforeYear,
            month: beforeMonth,
            day: beforeDayLen - i + 1,
            task: tasks[beforeDate] || [],
        });
    }

    // 当月填充
    let row;
    k--;
    for (i = 1; i <= curDayLen; i++) {
        row = Math.floor( (i + k) / 7 );
        lists[row] = lists[row] || [];
        const date = `${year}-${addZero(month)}-${addZero(i)}`;
        lists[row].push({
            year,
            month,
            day: i,
            date,
            task: tasks[date] || [],
        });
    }

    // 补后
    const afterMonth = Number(month) + 1 === 13 ? 1 : Number(month) + 1;
    const afterYear = afterMonth === 1 ? year + 1 : year;
    let j = 1;
    while (lists[row].length < WEEK_LEN) {
        const day = j++;
        const afterDate = `${afterYear}-${addZero(afterMonth)}-${addZero(day)}`;
        lists[row].push({
            date: afterDate,
            year: afterYear,
            month: afterMonth,
            day,
            task: tasks[afterDate] || [],
        });
    }
    return lists;
}

export default DateBody;