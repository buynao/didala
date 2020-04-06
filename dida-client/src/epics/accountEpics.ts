import { RootEpic } from "MyTypes";
import { fromPromise } from "rxjs/observable/fromPromise";
import { map } from "rxjs/operators/map";
import { tap } from "rxjs/operators/tap";
import { filter } from "rxjs/operators/filter";
import { ignoreElements } from 'rxjs/operators/ignoreElements';
import { switchMap } from "rxjs/operators/switchMap";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import message from "antd/es/message";
import { IAccountState } from "MyTypes";
import { isActionOf } from "typesafe-actions";
import accountActions, { registerAsync, logInAsync, logOutAsync, checkInAsync } from "@actions/account";

// 注册
export const registerEpic: RootEpic = (
    action$, store$,
    { account }
) =>
action$.pipe(
    filter(isActionOf(registerAsync.request)),
    switchMap((data) => fromPromise(account.register(data.payload))),
    ignoreElements()
);

// 登陆
export const loginEpic: RootEpic = (
    action$, store$,
    { account }
) =>
action$.pipe(
    filter(isActionOf(logInAsync.request)),
    switchMap((data) => fromPromise(account.logIn(data.payload)).pipe(
            map((data: IAccountState) => logInAsync.success(data)),
            catchError((e) => {
                message.error(e);
                return of(logInAsync.failure(e));
            })
        )
    ),
);

// 登出
export const loginOutEpic: RootEpic = (
    action$, store$,
    { account }
) =>
action$.pipe(
    filter(isActionOf(logOutAsync.request)),
    switchMap(() => fromPromise(account.logOut()).pipe(
            map(() => logOutAsync.success(accountActions.accountInitData)),
            catchError((e) => {
                message.error(e);
                return of(logOutAsync.failure(accountActions.accountInitData));
            })
        )
    ),
);

// 检查登录态
export const checkAccountEpic: RootEpic = (
    action$, store$,
    { account }
) =>
action$.pipe(
    filter(isActionOf(checkInAsync.request)),
    switchMap(() => fromPromise(account.checkIn()).pipe(
            map((data: IAccountState) => checkInAsync.success(data)),
            catchError((data: IAccountState) => {
                return of(checkInAsync.failure(data));
            })
        )
    ),
);

// 游客身份
export const setVisitorEpic: RootEpic = (
    action$, store$,
) => action$.pipe(
    filter(isActionOf(accountActions.setVisitorAction)),
    tap(() => {
        location.hash = "/task/today";
    }),
    map(() => accountActions.receiveVisitorAction("visitor"))
);