import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";

const HourMarkers = function (props) {
    const { curShowList, cellHeight, isExpand } = props;

    const cellStyle = {
        height: `${cellHeight / 2}px`,
        marginBottom: `${cellHeight / 2}px`
    }

    function HourItems() : JSX.Element[]{
        const hourItem = [];
        const hour = isExpand ? curShowList.length : curShowList.length + 1;
        for (let i = 0; i < hour; i++) {
            hourItem.push(<div key={i} className="tg-markercell" style={{height: `${cellHeight}px`}}>
            <div className="tg-dualmarker" style={cellStyle}></div>
        </div>);
        }
        if (!isExpand) {
            hourItem.unshift(<div className="tg-markercell cgd-gutter-bg-top" />)
            hourItem.push(<div className="tg-markercell cgd-gutter-bg-bottom" />)
        }
        console.log(hourItem);
        return hourItem;
    }

    return  <><td style={{width: "60px"}}></td>
    <td colSpan={7}>
        <div className="tg-spanningwrapper">
            <div className="tg-hourmarkers">
                {HourItems()}
            </div>
        </div>
    </td>
    </>
}

export default HourMarkers;