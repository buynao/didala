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
    const [ curHeight, moveHeight ] = React.useState(60);
    const moveFlag = React.useRef(null);
    const head = React.useRef(null);

    const moveDown = (e) => {
        const y = e.clientY - parseInt(head.current.style.height);
        document.onmousemove = function(event) {
            event.preventDefault()
            head.current.style.height = event.clientY - y + 'px';
        }
        document.onmouseup = function() {
            moveHeight(head.current.style.height);
            // 多次点击会注册多次事件造成内存泄漏
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    return <>
    <WeekHead renderTasks={renderTasks} />
    <div className="wk-allday" ref={head} style={{ height: curHeight }}>
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
        <div className="dragArea" >
            <div
                ref={moveFlag}
                className="dragger"
                onMouseDown={moveDown}
            />
        </div>
    </div>
    </>;
});

export default DateHead;