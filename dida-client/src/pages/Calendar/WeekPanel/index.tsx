import * as React from "react";
import DateHead from "./DateHead";
import DateBody from "./DateBody";
import { DateBodyProps } from "MyTypes";
import { CSSTransition } from 'react-transition-group';
require("./style.less");


interface IProps extends DateBodyProps {
    isShowPanel: boolean;
    transition: string;
}

const WeekContent = function (props: IProps) {
    const { isShowPanel, transition } = props;

    return (<CSSTransition
        in={isShowPanel}
        timeout={300}
        classNames={transition}
        unmountOnExit
      ><div className="c-week-container">
        <div className="c-week-label">
            <DateHead {...props} />
        </div>
        <div className="c-week-scroll">
            <DateBody {...props} />
        </div>
    </div></CSSTransition>)
}

export default WeekContent;