import * as React from "react";
import { connect } from "react-redux";
import {
    Route, Switch,
} from "react-router-dom";
import * as taskActions from "@actions/task";
import * as accountActions from "@actions/account";
import { IStoreState } from "MyTypes";
import { routeConfig } from "./config";
import { IGlobalTask } from "MyTypes";

import LeftBar from "../component/LeftBar";

interface IPops {
    name: string;
    tasks: IGlobalTask;
    logOut: () => void;
    checkIn: () => void;
    getAllTask: () => void;
}

const TaskCenter = function(props: IPops) {
    const { name, logOut, tasks, checkIn } = props;

    React.useEffect(() => {
        props.getAllTask();
    }, []);

    return (
        <div className="user-body">
            <LeftBar
                checkIn={checkIn}
                name={name}
                logOut={logOut}
                tasks={tasks}
            />
            <Switch>
                {
                    routeConfig.map((item, index) => {
                        const Comp = item.component;
                        return <Route
                            key={index}
                            path={item.path}
                            exact={item.exact}
                        >
                            <Comp type={item.type} />
                        </Route>;
                    })
                }
            </Switch>
        </div>
    );
}

function mapStateToProps(state: IStoreState): any {
    return {
        tasks: state.tasks,
        name: state.account.name,
    };
}

const dispatchProps = {
    getAllTask: taskActions.resetTaskAsync.request,
    logOut: accountActions.logOutAsync.request,
    checkIn: accountActions.checkInAsync.request,
}
export default connect(mapStateToProps, dispatchProps)(TaskCenter);
