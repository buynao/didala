import * as React from "react";
import DateHead from "./DateHead";
import DateBody from "./DateBody";
import { DateBodyProps } from "MyTypes";
import { CSSTransition } from 'react-transition-group';

interface IProps extends DateBodyProps {
    isShowPanel: boolean;
    transition: string;
}

const MonthContent = function (props: IProps) {
    const { isShowPanel, transition } = props;

    return (<CSSTransition
        in={isShowPanel}
        timeout={300}
        classNames={transition}
        unmountOnExit
      ><div className="c-month">
        <div className="c-day-label">
            <DateHead />
        </div>
        <div className="c-day-scroll" style={{height: `${window.innerHeight - 30 - 52}px`}}>
            <DateBody {...props} />
        </div>
    </div></CSSTransition>)
}

export default MonthContent;