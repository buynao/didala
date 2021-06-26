import * as React from "react";
import { addZero } from "@util/help";

const IS_ALLDAY = false;


const HouTasks = function (props) {
    const { renderTasks, isExpand, cellHeight, curShowList, handleAddDate, handleSeletctDate } = props;

    const [ selectDate, changeSelectDate ] = React.useState({ status: false, date: null, top: 0, time: '' });

    const handleClickWrapper = function(e: React.FormEvent<HTMLDivElement> | any, date) {
        const Yaxis = e.nativeEvent.layerY;
        const curTopAndTime = getTopAndTime(Yaxis, isExpand, cellHeight);

        changeSelectDate({
            ...curTopAndTime,
            status: true,
            date,
        });

        handleAddDate(`${date} ${curTopAndTime.time}`, IS_ALLDAY);
    }

    return  <>{
        renderTasks.map((item: any, index) => {
            return <td key={index} className="tg-col ui-droppable">
            {
                !isExpand ? <>
                <div className="cgd-col tg-col cgd-col-first" />
                <div
                    className="cgd-col tg-col cgd-col-last"
                    style={{top: `${ cellHeight * (curShowList.length + 1) }px`}}
                />
                </> : null
            }
            <div
                className="tg-col-eventwrapper"
                onClick={(e) => handleClickWrapper(e, item.date)}
                style={{
                    height:  `${ isExpand ? cellHeight * (curShowList.length) : cellHeight * (curShowList.length + 1)}px`
                }}
            >
                <div className="tg-gutter">
                    <HourComponent
                        date={item.date}
                        selectDate={selectDate}
                        tasks={item.task}
                        cellHeight={cellHeight}
                    />
                </div>
            </div>
        </td>
        })
    }</>
}

function getTopAndTime (y: number, isExpand: boolean, cellHeight: number) {
    const unitHeight = cellHeight / 2;
    const hourLevel = (Math.ceil(y / unitHeight) - 1);
    const top = hourLevel * unitHeight;

    const curDate = +new Date(`2020/01/01 ${isExpand ? "00:00:00" : "07:00:00"}`);
    const addMinute = hourLevel * 30 * 60 * 1000;
    const addDate = new Date(curDate + addMinute);
    const time = `${addZero(addDate.getHours())}: ${addZero(addDate.getMinutes())}`;

    return {
        top,
        time
    };
}
function HourComponent ({cellHeight, tasks, selectDate, date}) {
    // 选择标记
    if (
        (!selectDate.status || selectDate.date !== date) ||
        (!selectDate.status && tasks.length === 0)
    ) return null;

    const selectStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        left: "0%",
        height: `${cellHeight / 2}px`,
        backgroundColor: "rgba(76, 81, 95, 0.56)",
        color: "rgba(0, 0, 0, 0.85)",
        top: `${selectDate.top}px`
    };
    const tsk = tasks.filter((item) => !item.isAllDay);
    console.log(tsk);
    return  <div
        className="c-task none-priority ui-resizable ui-draggable"
        style={{
            ...selectStyle
        }}
    >
        {/* {
            tsk.map((item) => {
                return <div className="c-task-wrapper">
                    <div className="c-task-inner text-tny">
                        <div className="c-task-title">{item.title}</div>
                        <div className="c-task-time">{item.startTime}</div>
                    </div>
                </div>
            })
        } */}
        {
            selectDate.status ? <div className="c-task-wrapper">
            <div className="c-task-inner text-tny">
                <div className="c-task-title"></div>
                <div className="c-task-time">{selectDate.time}</div>
            </div>
        </div> : null
        }
</div>
}

export default HouTasks;