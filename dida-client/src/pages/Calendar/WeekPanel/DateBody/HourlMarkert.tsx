import * as React from "react";
import { IGlobalTask, IDateBody, IDate } from "MyTypes";
import { addZero } from "@util/help";
import classNames from "classnames";

const HourMarkers = function (props) {
    const { curShowList, cellHeight, expand } = props;

    const cellStyle = {
        height: `${cellHeight / 2}px`,
        marginBottom: `${cellHeight / 2}px`
    }

    function HourItems() {
        return curShowList.map((item, index) => {
                return  <div key={index} className="tg-markercell" style={{height: `${cellHeight}px`}}>
                    <div className="tg-dualmarker" style={cellStyle}></div>
                </div>
            })
    }

    return  <><td style={{width: "60px"}}></td>
    <td colSpan={7}>
        <div className="tg-spanningwrapper">
            <div className="tg-hourmarkers">
                {
                    expand ?
                    <HourItems />
                    : <>
                        <div className="tg-markercell cgd-gutter-bg-top" />
                        <div className="tg-markercell" style={{height: `${cellHeight}px`}}>
                            <div className="tg-dualmarker" style={cellStyle}></div>
                        </div>
                        <HourItems />
                        <div className="tg-markercell cgd-gutter-bg-bottom" />
                    </>
                }
            </div>
        </div>
    </td>
    </>
}

export default HourMarkers;