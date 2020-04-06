import { StateType, ActionType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import RootReducer from "./root-reducer";
import RootActions from "./root-actions";
declare module 'MyTypes' {
    export type RootState = StateType<
        ReturnType<typeof RootReducer>
    >;
    export type RootActions = ActionType<typeof RootActions>;
    export type RootEpic = Epic<RootActions, RootActions, RootState, Services>;
}
