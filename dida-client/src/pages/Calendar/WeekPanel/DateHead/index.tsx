import * as React from "react";
import { IDateBody, DateBodyProps } from "MyTypes";
import WeekHead from "./WeekHead";
import WeekHeadTasks from "./WeekHeadTasks";
import WeekHeadEmptyTask from "./WeekHeadEmptyTask";

interface DateHeadProps extends DateBodyProps {
    renderTasks: IDateBody[];
}
/**
 * 日期头部栏组件
 * 
 * | 周一 | 周二 |...| 周日 |
 * |  1   |  2  |...|   7  |
 */
const DateHead: React.FC<DateHeadProps> = React.memo((props) => {
    const { handleAddDate, handleSeletctDate, renderTasks } = props;

    return <>
    <WeekHead renderTasks={renderTasks} />
    <div className="wk-allday">
        <div className="tg-time-all" />
        <div className="tg-allday-wrapper">
            <div className="tg-allday">
                <div className="content-wrapper antiscroll-wrap">
                    <div className="content-skeleton">
                        <WeekHeadTasks 
                            renderTasks={renderTasks}
                            handleSeletctDate={handleSeletctDate}
                        />
                    </div>
                </div>
                <div className="bg">
                    <WeekHeadEmptyTask
                        renderTasks={renderTasks}
                        handleAddDate={handleAddDate}
                    />
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