import * as React from "react";
import DateHead from "./DateHead";
import DateBody from "./DateBody";
import { buildDayForTasks, buildDateBody } from "@util/help";
import { DateBodyProps } from "MyTypes";
import { CSSTransition } from 'react-transition-group';
require("./style.less");

interface IProps extends DateBodyProps {
    isShowPanel: boolean;
    transition: string;
}

const WeekContent = function (props: IProps) {
    const { isShowPanel, transition, curDate, tasks } = props;
    const tasksList = buildDayForTasks(tasks.all);
    const renderTasks = buildDateBody(curDate, tasksList);
    console.log(renderTasks)
    return (<CSSTransition
        in={isShowPanel}
        timeout={300}
        classNames={transition}
        unmountOnExit
      ><div className="c-week-container">
        <div className="c-week-label">
            <DateHead {...props} renderTasks={renderTasks} />
        </div>
        <div className="c-week-scroll">
            <DateBody {...props} renderTasks={renderTasks} />
        </div>
    </div></CSSTransition>)
}

export default WeekContent;