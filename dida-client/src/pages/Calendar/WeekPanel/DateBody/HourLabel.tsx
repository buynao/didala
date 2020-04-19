import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";
import { Tooltip } from 'antd';


const HourLabel = function (props) {
    const { curShowList, cellHeight, expand, toggleHourLabel } = props;

    return <td className="tg-times-pri">
        <div className="tg-times-pri-wrapper">
            <Forenoon
                expand={expand}
                cellHeight={cellHeight}
                toggleHourLabel={toggleHourLabel}
            />
            {
                curShowList.map((item) => {
                    return <div key={item} className="tg-time-pri" style={{height: `${cellHeight}px`}}>
                        {item}
                    </div>
                })
            }
            <Afternoon
                expand={expand}
                cellHeight={cellHeight}
                toggleHourLabel={toggleHourLabel}
            />
        </div>
    </td>
}

const Forenoon = function ({ expand, cellHeight, toggleHourLabel }) {
    return expand ?
    <ShowForenoon cellHeight={cellHeight} toggleHourLabel={toggleHourLabel }/>
    : <HideForenoon cellHeight={cellHeight} toggleHourLabel={toggleHourLabel }/>
}

const Afternoon = function({ expand, cellHeight, toggleHourLabel }) {
    return expand ?
    <ShowAfternoon cellHeight={cellHeight} toggleHourLabel={toggleHourLabel }/>
    : <HideAfternoon cellHeight={cellHeight} toggleHourLabel={toggleHourLabel }/>
}

const ShowForenoon = function ({ cellHeight, toggleHourLabel }) {
    return <Tooltip placement="right" title="点击隐藏00:00 - 07:00">
        <div
            className="rrd-range-group rrd-top ui-resizable"
            style={{ top: 0, height: `${7 * cellHeight}px`}}
            onClick={() => toggleHourLabel(false)}
        ></div>
    </Tooltip>;
}
const ShowAfternoon = function ({ cellHeight, toggleHourLabel }) {
    return <Tooltip placement="right" title="点击隐藏13:00 - 00:00">
        <div
            className="rrd-range-group rrd-bottom ui-resizable"
            onClick={() => toggleHourLabel(false)}
            style={{ top: `${13 * cellHeight}px`, height: `${11 * cellHeight}px`}}
        ></div>
    </Tooltip>;
}
const HideAfternoon = function ({cellHeight, toggleHourLabel}) {
    return <Tooltip placement="right" title="点击展开13:00 - 00:00">
        <div
            className="crd-bottom"
            onClick={() => toggleHourLabel(true)}
            style={{ marginBottom: `0px`}}
        >
            <div className="tg-time-pri">
                13:00 <br/> - 00:00
            </div>
        </div>
    </Tooltip>;
}
const HideForenoon = function ({cellHeight, toggleHourLabel}) {
    return <Tooltip placement="right" title="点击展开00:00 - 07:00">
        <div
            className="crd-top"
            style={{ marginBottom: `${cellHeight}px`}}
            onClick={() => toggleHourLabel(true)}
        >
            <div className="tg-time-pri">
                00:00 <br/> - 07:00
            </div>
        </div>
    </Tooltip>;
}

export default HourLabel;