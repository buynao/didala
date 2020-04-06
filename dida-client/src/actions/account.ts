import { createAction, createCustomAction, createAsyncAction } from "typesafe-actions";
import { IAccountState, ILoginAndRegister } from "MyTypes";

// 1. 登录态检查
export const checkInAsync = createAsyncAction(
    'CHECK_IN/REQUEST',
    'CHECK_IN/SUCCESS',
    'CHECK_IN/ERROR'
)<undefined, IAccountState, IAccountState>();

// 2. 退出登录
export const logOutAsync = createAsyncAction(
    'LOG_OUT/REQUEST',
    'LOG_OUT/SUCCESS',
    'LOG_OUT/ERROR'
)<undefined, IAccountState, IAccountState>();

// 3. 登录
export const logInAsync = createAsyncAction(
    'LOG_IN/REQUEST',
    'LOG_IN/SUCCESS',
    'LOG_IN/ERROR'
)<ILoginAndRegister, IAccountState, any>();

// 4. 注册
export const registerAsync = createAsyncAction(
    'REGISTER/REQUEST',
    'REGISTER/SUCCESS',
    'REGISTER/ERROR'
)<ILoginAndRegister, any, any>();

// 5. 设置游客状态
const SET_VISITOR = "SET_VISITOR/REQUEST";
const RECEIVE_SET_VISITOR = "SET_VISITOR/SUCCESS";
export const setVisitorAction = createAction(SET_VISITOR)();

export const receiveVisitorAction = createCustomAction(RECEIVE_SET_VISITOR,
    (role: string) =>  ({ payload: role })
);
// 初始值
export const accountInitData: IAccountState = {
    role: "",
    name: ""
}
export default {
    setVisitorAction,
    receiveVisitorAction,
    accountInitData
}