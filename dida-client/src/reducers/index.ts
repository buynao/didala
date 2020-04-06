import { createReducer } from "typesafe-actions";
import { combineReducers } from 'redux';
import * as actions from "@actions/account";

const reducer = combineReducers({
    name: createReducer("")
    .handleAction([
        actions.checkInAsync.success,
        actions.logInAsync.success
    ], (state, data) => data.payload.name)
    .handleAction([
        actions.checkInAsync.failure
    ], () => "游客"),

    role: createReducer("")
    .handleAction([
        actions.checkInAsync.success,
        actions.logInAsync.success
    ], (state, data) => data.payload.role)
    .handleAction([
        actions.checkInAsync.failure
    ], () => "visitor")
});

export default reducer;
