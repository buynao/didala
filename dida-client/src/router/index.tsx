import * as React from "react";
import {
    HashRouter,
    Route, Switch,
} from "react-router-dom";
import { globalRouteConfig } from "./config";

const RouteCenter = function () {
    return (
        <HashRouter>
            <Switch>
                {
                    globalRouteConfig.map((item) => {
                        return <Route
                            key={item.path}
                            path={item.path}
                            exact={item.exact}
                            component={item.component}
                        />
                    })
                }
            </Switch>
        </HashRouter>
    );
}

export default RouteCenter;
