
import * as React from "react";
import { connect } from "react-redux";
import AccountInput from "./component/Input";
import accountActions, { registerAsync, logInAsync, checkInAsync } from "@actions/account";
import { titlePrefix } from "@util/help";
import { ILoginAndRegister } from "MyTypes";
const styles = require("./style.less");
const bgLeft = require("./img/bg_left.png");
const bgRight = require("./img/bg_right.png");
const logo = require("./img/logo.png");

interface CheckLoginResultObj {
    error: boolean;
    type: string;
    msg: string;
}

interface IProps {
    loginIn?: (data: ILoginAndRegister) => void;
    registerIn?: (data: ILoginAndRegister) => void;
    checkIn?: () => void;
    setVisitor: () => void;
}

const Account = function(props: IProps) {
    const [ state, saveState ] = React.useState({
        name: "",
        nameError: "",
        account: "",
        password: "",
        passwordError: "",
        accountError: "",
    });
    const [ focus, saveFocus ] = React.useState("");
    // login -> 登录模式;
    // register -> 注册模式
    const [ status, toggleStatus ] = React.useState("login");
    const { account, password, passwordError, accountError, name, nameError } = state;
    const { setVisitor, checkIn, loginIn, registerIn } = props;

    React.useEffect(() => {
        checkIn();
        document.title = status === 'login' ? titlePrefix('登录') : titlePrefix('注册');
    }, [status])

    const onChange = (type: any, e: React.FormEvent<HTMLInputElement>, ) => {
        const target = e.currentTarget;
        saveState((state) => {
            return {
                ...state,
                [type]: target.value,
            }
        });
    };

    // 样式高亮
    const onFocus = (cls) => {
        saveFocus(cls);
    };

    // 样式默认
    const onWrapClick = (e: any) => {
        const name = e.target.name;
        if (name !== "account" && name !== "password" && name !== "name") {
            saveFocus("");
        }
    }

    const accountControl = React.useCallback(() => {
        // 校验格式
        const result = checkLogin(account, password);
        if (result.error) {
            saveState((state) => {
                return {
                    ...state,
                    passwordError: "",
                    accountError: "",
                    [result.type]: result.msg,
                }
            });
            return;
        }
        // 重置错误提示
        saveState((state) => {
            return {
                ...state,
                passwordError: "",
                accountError: "",
            }
        });
        if (status === 'login') {
            // 请求
            loginIn({
                account,
                password,
            });
        } else {
            registerIn({
                account,
                password,
                name
            })
        }
    }, [status, account, password, name]);
    
    return (<div className="login-wrap" onClick={onWrapClick}>
    <img className="bg-left" src={bgLeft.default} alt="left" />
    <img className="bg-right" src={bgRight.default} alt="right" />
    <span className="copyright" />
    <div className="login-inner">
        {status === "login" ?
        <img className="login-logo" src={logo.default} alt="logo" />
        :
        <AccountInput
            type="text"
            name="name"
            placeholder="昵称(可选)"
            error={nameError}
            focus={focus}
            handleFocus={onFocus.bind(this, "name")}
            handleChange={onChange.bind(this, "name")}
        />
        }
        <AccountInput
            type="text"
            name="account"
            placeholder="账号"
            error={accountError}
            focus={focus}
            handleFocus={onFocus.bind(this, "account")}
            handleChange={onChange.bind(this, "account")}
        />
        <AccountInput
            type="password"
            name="password"
            placeholder="密码"
            error={passwordError}
            focus={focus}
            handleFocus={onFocus.bind(this, "password")}
            handleChange={onChange.bind(this, "password")}
        />
        <div className="login-btn">
            <button className="login-btn-before" onClick={accountControl}>
                {status === "login" ? "登录" : "注册"}
            </button>
        </div>
        <div className="register-link">
            {
                status === "login" ?
                <><a onClick={() => {
                    toggleStatus("register")
                }}>
                    创建免费账号?
                </a>
                <strong className="visitor" onClick={setVisitor}>
                    游客模式
                </strong></>
                :
                <><span>已有账号？</span><a onClick={() => {
                    toggleStatus("login")
                }}>登录</a></>
            }
        </div>
    </div>
</div>);
}

function mapStateToProps(state: any): any {
    return {
        ...state,
    };
}

const dispatchProps = {
    loginIn: logInAsync.request,
    registerIn: registerAsync.request,
    checkIn: checkInAsync.request,
    setVisitor: accountActions.setVisitorAction
}

function checkLogin(account: string, password: string): CheckLoginResultObj {
    const res = { error: false, msg: "", type: "" };
    if (account === "") {
        res.msg = "账号不能为空";
        res.type = "accountError";
        res.error = true;
        return res;
    }
    if (password === "") {
        res.msg = "密码不能为空";
        res.type = "passwordError";
        res.error = true;
        return res;
    }
    if (password) {
        res.type = "passwordError";
        if (password.length < 6) {
            res.error = true;
            res.msg = "密码的长度至少为6";
            return res;
        }
    }
    if (account) {
        res.type = "accountError";
        if (account.length > 10) {
            res.error = true;
            res.msg = "账号长度过长";
            return res;
        }
    }
    return res;
}
export default connect(mapStateToProps, dispatchProps)(Account);
