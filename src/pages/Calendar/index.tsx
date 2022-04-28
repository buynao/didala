import * as React from "react";
import { connect } from "react-redux";
import { dispatchProps } from "@reducers/task";
import { TaskItem, ITaskMethods, IGlobalTask, DateType, IDate } from "MyTypes";
import { titlePrefix } from "@util/help";
import Header from "./Header";
import Content from "./Content";
require("./style.less");

interface IProps extends ITaskMethods {
    curTask: TaskItem;
    tasks: IGlobalTask;
    history: any;
    type: string;
}

function useGetStandDate(date: Date) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1) as any;
        month = month < 10 ? `0${month}` : `${month}`;
        month = Number(month);
    const day = date.getDate();
    const [ curDate, changeCurDate ] = React.useState<IDate>({
        year, month, day
    });
    return { curDate, changeCurDate };
}

const Calendar = function (props: IProps) {
    const { curDate, changeCurDate } = useGetStandDate(new Date());
    const [ initDate ] = React.useState(curDate)
    const [ isShowPanel, tooglePanel ] = React.useState(true);
    const [ transition, changeTransition] = React.useState("");
    const [ DateType, changeDateType ] = React.useState<DateType>("week");
    const { all } = props.tasks; // 当月任务 -> 暂取全局

    React.useEffect(() => {
        // const timeZone = getTimeZone(curDate.year, curDate.month);
        // 获取当前时间段的任务
        // props.getTaskList(timeZone);
        document.title = titlePrefix('日历');
    }, []);

    const refreshPanel = (data: IDate, transitionType: string) => {
        changeCurDate(data);
        tooglePanel(false); // 动画效果切换
        setTimeout(() => {
            tooglePanel(true);
        });
        changeTransition(transitionType);
    }

    return (<div className="calendar-view">
        <div className="calendar-wrap">
            <Header
                dateType={DateType}
                changeDateType={changeDateType}
                initDate={initDate}
                curDate={curDate}
                refreshPanel={refreshPanel}
            />
            <Content
                dateType={DateType}
                isShowPanel={isShowPanel}
                curDate={curDate}
                curTaskList={all}
                transition={transition}
                {...props}
            />
        </div>
    </div>);
}

/**
 * 取当前时间区间
 * 日历最多展示3个月
 * 取3个月的时间段
 * @param year 
 * @param month 
 */
function getTimeZone(year, month) {
    // 补前
    const beforeMonth = Number(month) - 1 === 0 ? 12 : Number(month) - 1;
    const beforeYear = beforeMonth === 12 ? year - 1 : year;

    const afterMonth = Number(month) + 1 === 13 ? 1 : Number(month) + 1;
    const afterYear = afterMonth === 1 ? year + 1 : year;

    const startDate = +new Date(`${beforeYear}-${beforeMonth}-01 00:00`);
    const endDate = +new Date(`${afterYear}-${afterMonth}-${29} 24:00`);
    return {
        startDate,
        endDate,
    };
}

function mapStateToProps(state: any): any {
    return {
        ...state,
    };
}

export default connect(mapStateToProps, dispatchProps)(Calendar);
