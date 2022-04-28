import * as React from "react";
import { IGlobalTask, IDateBody, DateBodyProps } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import HourLabel from "./HourLabel";
import HourMarkert from "./HourlMarkert";
import HourTasks from "./HourTasks";

interface WeekDBProps extends DateBodyProps {
    renderTasks: IDateBody[];
}

export interface HourPros {
    isExpand: boolean;
}

const CELL_HEIGHT = 258;
const EXPAND_INIT_STATUS = false;

const DateBody = (props: WeekDBProps) : JSX.Element => {
    const { renderTasks, handleAddDate, handleSeletctDate } = props;

    const [cellHeight, changeCellHeight] = React.useState(CELL_HEIGHT);
    const [isExpand, toggleExpand] = React.useState(EXPAND_INIT_STATUS);
    const [curShowList, changeList] = React.useState(genHourList(isExpand));
    console.log(curShowList);
    const toggleHourLabel = (expandStatus: boolean) => {
        toggleExpand(!isExpand)
        changeList(genHourList(!isExpand))
    }

    const mainCls = classNames('tg-mainwrapper', {
        'hide-range': !isExpand
    });
    return (
        <div className="wk-scrolltimedevents antiscroll-inner" style={{ height: '100%' }}>
            <Scrollbars>
            <div className={mainCls}>
                <table className="tg-timedevents" style={{ height: cellHeight * curShowList.length}}>
                    <tbody>
                        <tr style={{height: "1px"}}>
                            <HourMarkert
                                isExpand={isExpand}
                                curShowList={curShowList}
                                cellHeight={cellHeight}
                                changeCellHeight={changeCellHeight}
                                toggleHourLabel={toggleHourLabel}
                                handleAddDate={handleAddDate}
                            />
                        </tr>
                        <tr className="tg-col-wrapper">
                            <HourLabel
                                isExpand={isExpand}
                                curShowList={curShowList}
                                cellHeight={cellHeight}
                                changeCellHeight={changeCellHeight}
                                toggleHourLabel={toggleHourLabel}
                            />
                            <HourTasks
                                isExpand={isExpand}
                                handleAddDate={handleAddDate}
                                handleSeletctDate={handleSeletctDate}
                                renderTasks={renderTasks}
                                cellHeight={cellHeight}
                                curShowList={curShowList}
                                changeCellHeight={changeCellHeight}
                                toggleExpand={toggleExpand}
                            />
                        </tr>
                    </tbody>
                </table>
            </div>
            </Scrollbars>
        </div>)
}
function genHourList(isExpand: boolean) {
    const list = [];
    if (isExpand) {
        const hour = 24;
        for (let i = 0; i < hour; i++) {
            list.push(`${addZero(i)}：00`);
        }
    } else {
        for (let i = 8; i < 13; i++) {
            list.push(`${addZero(i)}：00`);
        }
    }
    return list;
}

export default DateBody;