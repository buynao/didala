import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import HourLabel from "./HourLabel";
import HourMarkert from "./HourlMarkert";
import HourTasks from "./HourTasks";

interface DateHeadProps {
    curDate: IDate;
    tasks: IGlobalTask
    renderTasks: IDateBody[];
    handleAddDate: any;
    handleSeletctDate: any;
}

const CELL_HEIGHT = 258;
const EXPAND_INIT_STATUS = false;

function genHourList(type: boolean) {
    const list = [];
    if (type) {
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

const DateBody = (props: DateHeadProps) : JSX.Element => {
    const { curDate, renderTasks, handleAddDate, handleSeletctDate } = props;

    const [cellHeight, changeCellHeight] = React.useState(CELL_HEIGHT);
    const [expand, toggleExpand] = React.useState(EXPAND_INIT_STATUS);
    const [curShowList, changeList] = React.useState(genHourList(expand));

    const toggleHourLabel = React.useCallback((expandStatus: boolean) => {
        toggleExpand(expandStatus)
        changeList(genHourList(expandStatus))
    }, [expand])

    const mainCls = classNames('tg-mainwrapper', {
        'hide-range': !expand
    });
    return (
        <div className="wk-scrolltimedevents antiscroll-inner" style={{ height: '100%' }}>
            <Scrollbars>
            <div className={mainCls}>
                <table className="tg-timedevents" style={{ height: cellHeight * curShowList.length}}>
                    <tbody>
                        <tr style={{height: "1px"}}>
                            <HourMarkert
                                expand={expand}
                                handleAddDate={handleAddDate}
                                curShowList={curShowList}
                                cellHeight={cellHeight}
                                changeCellHeight={changeCellHeight}
                                toggleHourLabel={toggleHourLabel}
                            />
                        </tr>
                        <tr className="tg-col-wrapper">
                            <HourLabel
                                expand={expand}
                                curShowList={curShowList}
                                cellHeight={cellHeight}
                                changeCellHeight={changeCellHeight}
                                toggleHourLabel={toggleHourLabel}
                            />
                            <HourTasks
                                expand={expand}
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

export default DateBody;