
declare module 'MyTypes' {
    export type IMenuItem = {
        text: string,
        icon: string,
        path: string,
        count: number,
        showCount: boolean,
        active: boolean,
        type?: string,
        component?: any,
        key?: any;
        exact?: boolean,
    }
}