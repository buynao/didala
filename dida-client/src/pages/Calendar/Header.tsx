import * as React from "react";
import message from "antd/es/message";
import { ArrowLeft, ArrowRight } from "@icons";

type curDate = {
    cYear: number;
    cMonth: number;
}
interface IProps<T> {
    curDate: T;
    initDate: T;
    refreshPanel:  (data: any, type: any) => void;
}

const Header = function (props: IProps<curDate>) {
    const { cYear, cMonth } = props.curDate;
    const { refreshPanel, initDate } = props;
    const disableToast = function () {
        message.warn("暂未开放")
    }

    const handleChangeCurDate = function (newMonth: number, transitionType: string) {
        let year = newMonth >= 13 ? cYear + 1 : newMonth <= 0 ? cYear - 1 : cYear;
        let month = newMonth >= 13 ? 1 : newMonth <= 0 ? 12 : newMonth;
 
        refreshPanel({
            cYear: year,
            cMonth: month,
        }, transitionType);
    }

    const handleInitCurDate = function() {
        refreshPanel(initDate, "");
    }
    return <div className="c-nav">
        <h5 className="left c-range-wrap">
            <span className="c-range">{cYear}年{cMonth}月</span>
            {/* <span className="c-range-arrow">▾</span> */}
        </h5>
        <div className="c-type-wrapper c-month-selected">
            <button className="c-btn c-day btn-sml" onClick={disableToast}>日</button>
            <button className="c-btn c-week btn-sml" onClick={disableToast}>周</button>
            <button className="c-btn c-month btn-sml c-selected">月</button>
        </div>
        <div className="right clearfix">
            <button className="c-btn c-prev btn-sml" onClick={() => handleChangeCurDate(cMonth - 1, "prev")}>
                <ArrowLeft width={24} height={24} />
            </button>
            <button className="c-btn c-today btn-sml" onClick={handleInitCurDate}>今天</button>
            <button className="c-btn c-next  btn-sml" onClick={() => handleChangeCurDate(cMonth + 1, "next")}>
                <ArrowRight width={24} height={24} />
            </button>
        </div>
    </div>;
}

export default Header;
