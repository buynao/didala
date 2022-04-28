import { combineEpics  } from "redux-observable";
import * as Tasks from "@epics/taskEpics";
import * as Accounts from "@epics/accountEpics";

const rootEpic = combineEpics(
    ...Object.values(Tasks),
    ...Object.values(Accounts),
);

export default rootEpic;
