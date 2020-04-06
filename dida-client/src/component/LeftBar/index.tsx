import * as React from "react";
import MenuList from "./Menu";
import { IGlobalTask } from "MyTypes";
import { menuConfig } from "@router/config";
import { LogOutIcon } from "@icons";
require("./style.less");

const Logo = require("../../imgs/logo.jpg");
const { useEffect } = React;

interface IProps {
    name: string;
    tasks: IGlobalTask;
    checkIn: () => void;
    logOut: () => void;
}


function LeftBar (props: IProps) {
    const { logOut, tasks, name } = props;

    useEffect(() => {
        if (!name) {
            props.checkIn();
        }
    }, []);

    return (<div className="leftBar">
        <div className="tool-bar">
            <div className="t-user user">
                <img className="avatar" alt={name} title={name} src={Logo.default} />
                <span className="username t-name" title={name}>{name}</span>
            </div>
            <div className="t-logout" onClick={logOut}>
                <span className="logout-text">退出登录</span>
                <LogOutIcon className="logout-icon" />
            </div>
        </div>
        <div className="lists">
            <MenuList
                tasks={tasks}
                menuConfig={menuConfig}
            />
        </div>
    </div>);
}


export default LeftBar;
