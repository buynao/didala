
import { Remote } from "@util/index";
import message from "antd/es/message";
import { ILoginAndRegister } from "MyTypes";

interface AccountApi {
    error: number;
    msg: string
    name?: string
}

export function logIn (data: ILoginAndRegister) {
    return new Promise((resolve, reject) => {
        Remote.post("/api/login", data).then((result: AccountApi) => {
            if (result.error === 0) {
                message.success("登录成功");
                location.hash = "/task/today";
                resolve({
                    name: result.name,
                    role: "register"
                })
            }
            reject(result.msg)
        }, (eror) => {
            reject(eror)
        })
    })
}

export function logOut () {
    return new Promise((resolve, reject) => {
        Remote.get("/api/logout").then((result: AccountApi) => {
            if (result.error === 0) {
                message.success(result.msg);
                resolve(result.msg)
                location.hash = "/login";
            } else {
                reject(result.msg);
            }
        }, (eror) => {
            reject(eror)
        })
    })
}

export function checkIn () {
    return new Promise((resolve, reject) => {
        const VISITOR = {
            name: "游客1",
            role: "visitor"
        };
        Remote.get("/api/checkLogin").then((result: AccountApi) => {
            if (result.error === 0) {
                resolve({
                    name: result.name,
                    role: "register"
                })
            }
            reject(VISITOR)
        }, () => {
            reject(VISITOR)
        })
    })
}

export function register (data: ILoginAndRegister) {
    return new Promise((resolve, reject) => {
        Remote.post("/api/register", data)
        .then((result: AccountApi) => {
            if (result.error === 0) {
                message.success("注册成功");
                location.hash = "/account";
                resolve("/account")
            } else {
                message.warn(result.msg);
                reject(result.msg)
            }
        }, (eror) => {
            reject(eror)
        })
    })
}