import * as React from "react";

function WeekHeadEmptyTask({ renderTasks, handleAddDate }) {
    return  <table>
    <tbody>
        <tr>
            {renderTasks.map((item, index) => {
                return <td
                    key={index}
                    onClick={() => handleAddDate(item.date)}
                    className="all-day-item"
                    date-date={item.date}
                />
            })}
        </tr>
    </tbody>
</table>
}

export default WeekHeadEmptyTask;