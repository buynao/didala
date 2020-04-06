import * as React from "react";


/**
 * 日期头部栏组件
 * 
 * | 周一 | 周二 |...| 周日 |
 * 
 */
const DateHead = () => {
    const DAY_LABES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    return <table className="c-day-labes-inner">
        <tbody>
            <tr>
                {DAY_LABES.map((text, index) => {
                    return <td key={index} className={`c-day-label ${index > 4 ? "c-day-week" : ""}`}>{text}</td>;
                })}
            </tr>
        </tbody>
    </table>;
};

export default DateHead;