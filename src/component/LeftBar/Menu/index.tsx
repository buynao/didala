
import * as React from "react";
import Item from "../Item";
import { IMenuItem } from "MyTypes"
import { TasksLists } from "MyTypes"

interface IProps {
    tasks: {};
    menuConfig: IMenuItem[];
}

function MenuList (props: IProps) {
    const { tasks, menuConfig } = props;

    function countTask(tasks: TasksLists) : number {
        return tasks.filter((item) => {
            if (item.status === 0) {
                return item;
            }
        }).length;
    }

    return (<>
            {
                menuConfig.map((item, index) => {
                    return <Item
                        key={index}
                        icon={item.icon}
                        text={item.text}
                        active={item.active}
                        path={item.path}
                        showCount={item.showCount}
                        href={location.href}
                        count={countTask(tasks[item.type] || [])}
                    />;
                })
            }
        </>)
}

export default MenuList;
