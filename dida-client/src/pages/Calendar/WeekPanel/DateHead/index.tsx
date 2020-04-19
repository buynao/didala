import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

interface DateHeadProps {
    curDate: IDate;
    tasks: IGlobalTask
    renderTasks: IDateBody[];
    handleAddDate: any;
    handleSeletctDate: any;
}

/**
 * 日期头部栏组件
 * 
 * | 周一 | 周二 |...| 周日 |
 * |  1   |  2  |...|   7  |
 */
const DateHead: React.FC<DateHeadProps> = React.memo((props) => {
    const DAY_LABES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const { handleAddDate, handleSeletctDate, renderTasks } = props;

    return <><table className="top-container-week wk-weektop">
        <tbody>
            <tr className="wk-daynames">
                <th scope="col" className="wk-tzlabel"></th>
                {renderTasks.map((text, index) => {
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
        <div className="tg-time-all" />
        <div className="tg-allday-wrapper">
            <div className="tg-allday">
                <div className="content-wrapper antiscroll-wrap">
                    <div className="content-skeleton">
                        <table>
                            <tbody>
                                <tr>
                                {renderTasks.map((item, idx) => {
                                    return <td
                                            key={idx}
                                            className="c-titlebar"
                                            data-date={item.date}
                                        >
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
                <div className="bg">
                    <table>
                        <tbody>
                            <tr>
                                {renderTasks.map((item, index) => {
                                    return <td
                                        key={index}
                                        onClick={() => handleAddDate(item.date)}
                                        className="all-day-item"
                                        date-date={item.date}
                                    />
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="dragArea">
            <div className="dragger" />
        </div>
    </div>
    </>;
});

export default DateHead;