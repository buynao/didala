import * as React from "react";
import { Scrollbars } from "react-custom-scrollbars";

function WeekHeadTasks({ renderTasks, handleSeletctDate }) {
    return  <table>
    <tbody>
        <tr>
        {renderTasks.map((item, idx) => {
            return <td
                    key={idx}
                    className="c-titlebar"
                    data-date={item.date}
                >
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
        })}</tr>
    </tbody>
</table>
}

export default WeekHeadTasks;