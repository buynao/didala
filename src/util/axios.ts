/**
 * 定义远程访问组件。
 * 可根据业务情况，统一处理返回数据
 */

import Axios from "axios";

const Config = {
    initPage: true,
    mockData: false,
    api: {
        protocol: "http",
        domain: "localhost:7001",
    },
};
const axios = Axios.create();

const METHOD = {
    GET: "GET",
    POST: "POST",
};
/**
 * 获取当前所处环境。
 * @return string
 */
const getEnv = () => {
    const domain = window.location.host;
    if (/local/g.test(domain)) {
        return "dev";
    }
    return "";
};

/**
 *  依照环境生成域名
 *  @return string
 */
const genDomainForEnv = () => {
    const env = getEnv();
    let domain = Config.mockData ? "" : `${Config.api.protocol}://${Config.api.domain}`;
    domain = env === "dev" ? `${domain}` : "";
    return domain;
};
/**
 * 定义生成http query string的方法
 * @param queryData Object query参数
 * @return string query字符串
 */
const genQuery = (queryData: any) => {
    let ret = "";
    for (const key in queryData) {
        if (queryData[key]) {
            ret += `&${key}=${encodeURIComponent(queryData[key])}`;
        }
    }
    return ret.replace(/&/, "?");
};
/**
 * HTTP 请求远端数据。
 * @return Promise
 */
const http = (method: any, url: any, data: any, type = "json") => {
    if (!url) { return null; }
    const send = axios.request;
    const config: any = {
        url,
        withCredentials: true,
        method,
    };
    if (method === METHOD.GET) {
        config.url += genQuery(data);
    } else {
        let contentType = "";
        let cfgData = data;
        switch (type) {
            case "json":
                contentType = "application/json";
                cfgData = JSON.stringify(data || {});
                break;
            default:
                break;
        }
        config.headers = { "Content-Type": contentType };
        config.data = cfgData;
    }
    return new Promise((resolve, reject) => {
        send(config).then((resp) => {
            const respData = resp.data;
            // 接口端统一处理跳转login页面
            if (parseInt(respData.error, 10) === 302 && respData.redirectUrl) {
                window.location.href = respData.redirectUrl;
            } else {
                resolve(respData);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};
export default class Remote {
    public static domain = genDomainForEnv();

    /**
     * HTTP GET 远端数据。
     */
    public static get(url: any, data?: any) {
        return http(METHOD.GET, `${Remote.domain}${url}`, data);
    }

    /**
     * HTTP POST 远端数据。
     */
    public static post(url: any, data: any, type = "json") {
        return http(METHOD.POST, `${Remote.domain}${url}`, data, type);
    }
}
