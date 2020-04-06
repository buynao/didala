

const store = localStorage;


export const add = (key, value) => {
    try {
        let val = typeof value !== "string" ? JSON.stringify(value): value;
        store.setItem(key, val)
    } catch (error) {
        return false;
    }
    return true;
}

export const get = (key) => {
    let val = store.getItem(key);
    try {
        val = typeof val === "string" ? JSON.parse(val): val;
    } catch (error) {
        return null;
    }
    return val;
}

const del = (key, value) => {
    let val = store.getItem(key);
    try {
        val = typeof val === "string" ? JSON.parse(val): val;
        if (value) {

        }
    } catch (error) {
        return null;
    }
    return val;
}

export default class Storage {

    public static add(key: any, data?: any) {
        return add(key, data);
    }
    public static get(key: String) {
        return get(key);
    }
}