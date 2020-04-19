import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";

const HouTasks = function (props) {
    const { renderTasks, expand, cellHeight, curShowList, handleAddDate, handleSeletctDate } = props;

    const [selectDate, toggleSelectStatue] = React.useState({ status: false, date: null, top: 0 });

    const handleClickWrapper = function(e: React.FormEvent<HTMLDivElement> | any, date) {
        const Yaxis = e.nativeEvent.layerY;
        console.log(e.nativeEvent.layerY, date);
        const top = getHourTop(Yaxis, expand, cellHeight);
        toggleSelectStatue({
            status: true,
            date,
            top
        });
    }

    return  <>{
        renderTasks.map((item: any, index) => {
            return <td key={index} className="tg-col ui-droppable">
            {
                !expand ? <>
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
                    height:  `${ cellHeight * (curShowList.length + 1) }px`
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
function getHourTop (y, expand, cellHeight) {
    const unitHeight = cellHeight / 2;
    const curHeight = (Math.ceil(y / unitHeight) - 1) * unitHeight;
    console.log(y, unitHeight, Math.ceil(y / unitHeight))
    return curHeight;
}
function HourComponent ({cellHeight, tasks, selectDate, date}) {

    if (!selectDate.status || selectDate.date !== date) return null;

    const selectStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        left: "0%",
        height: `${cellHeight / 2}px`,
        backgroundColor: "rgba(76, 81, 95, 0.56)",
        color: "rgba(0, 0, 0, 0.85)",
        top: `${selectDate.top}px`
    };

    return  <div
        className="c-task none-priority ui-resizable ui-draggable"
        style={{
            ...selectStyle
        }}
    >
    <div className="c-task-wrapper">
        <div className="c-task-inner text-tny">
            <div className="c-task-title">asd</div>
            <div className="c-task-time">08:00</div>
        </div>
    </div>
</div>
}

export default HouTasks;