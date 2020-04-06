import * as React from "react";
import { IGlobalTask } from "MyTypes";

interface IProps {
    addTask: (data: any) => void;
    desc: string;
    tasks: IGlobalTask;
}

const AddTask = function(props: IProps) {
    const [ value, saveValue] = React.useState("");
    const { addTask, desc } = props;

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            addTask({ title: value });
            saveValue("");
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        saveValue(e.currentTarget.value);
    }

    return (<div className="add-task">
            <input
                value={value}
                className="task-input"
                type="text"
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                placeholder={`添加"${desc}"的任务，回车即可保存`}
            />
        </div>);
}

export default AddTask;
