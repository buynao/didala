
const taskSchema = {
    anthor: "游客",
    _id: 100,
    status: 0, // 0 未完成  1已完成 2删除
    title: "标题",
    content: "内容",
    startTime: +new Date(),
    modifiedTime: +new Date(),
    deleteCount: 0, // 是否删除过
    etag: "",
    name: "test",
    color: null,
    isAllDay: true,
}
function genID() {
    return 'xxxxxxxxyxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
function taskInfo(data?: Task) {
    data._id = genID();
    return {
        ...taskSchema,
        ...data,
    }
}
interface Task {
    title?: string;
    content?: string;
    _id?: string;
}
export default class Model {

    public static task(data?: Task) {
        return taskInfo(data);
    }
}