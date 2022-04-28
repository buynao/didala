import * as React from "react";
import message from "antd/es/message";
import classNames from 'classnames';
import { ArrowLeft, ArrowRight } from "@icons";
import { DateType, IDate } from "MyTypes";
import { moveDate, getNewDate } from "@util/help";

interface IProps<T> {
    curDate: T;
    initDate: T;
    dateType: DateType;
    changeDateType: React.Dispatch<React.SetStateAction<DateType>>;
    refreshPanel:  (data: T, type: string) => void;
}
const prevBtnCls = "c-btn btn-sml";

const Header = function (props: IProps<IDate>) {
    const { year, month, day } = props.curDate;
    const { refreshPanel, initDate, dateType, changeDateType } = props;
    const disableToast = function () {
        message.warn("暂未开放")
    }

    const handleChangeCurDate = function (transitionType: string) {
        const getChangeDate = {
            prev() {
                if (dateType === 'month') {
                    return getNewDate({year, month: month - 1, day})
                } else if (dateType === 'week') {
                    return moveDate(`${year}-${month}-${day}`, 7)
                }
            },
            next() {
                if (dateType === 'month') {
                    return getNewDate({year, month: month + 1, day})
                } else if (dateType === 'week') {
                    return moveDate(`${year}-${month}-${day}`, 0, 7)
                }
            }
        }
        const dateData = getChangeDate[transitionType]();
        refreshPanel(dateData, transitionType);
    }
    const dateMonthCls = classNames(prevBtnCls, {
        "c-month":  true,
        "c-selected": dateType === 'month'
    });
    const dateWeekCls = classNames(prevBtnCls, {
        "c-week":  true,
        "c-selected": dateType === 'week'
    });
    const dateTodayCls = classNames(prevBtnCls, {
        "c-today": true,
        "c-selected": dateType === 'today'
    });
    
    const handleInitCurDate = function() {
        refreshPanel(initDate, "");
    }

    return <div className="c-nav">
        <h5 className="left c-range-wrap">
            <span className="c-range">{year}年{month}月</span>
            {/* <span className="c-range-arrow">▾</span> */}
        </h5>
        <div className="c-type-wrapper c-month-selected">
            <button className={dateTodayCls} onClick={disableToast}>日</button>
            <button className={dateWeekCls} onClick={() => changeDateType("week")}>周</button>
            <button className={dateMonthCls} onClick={() => changeDateType("month")}>月</button>
        </div>
        <div className="right clearfix">
            <button className="c-btn c-prev btn-sml" onClick={() => handleChangeCurDate("prev")}>
                <ArrowLeft width={24} height={24} />
            </button>
            <button className="c-btn c-today btn-sml" onClick={handleInitCurDate}>今天</button>
            <button className="c-btn c-next  btn-sml" onClick={() => handleChangeCurDate("next")}>
                <ArrowRight width={24} height={24} />
            </button>
        </div>
    </div>;
}

export default Header;
