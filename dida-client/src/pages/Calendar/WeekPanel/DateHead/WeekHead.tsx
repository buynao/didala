import * as React from "react";
import classNames from "classnames";

const DAY_LABES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

function WeekHead({ renderTasks }) {
    return <table className="top-container-week wk-weektop">
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
}

export default WeekHead;