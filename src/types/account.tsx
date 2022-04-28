
declare module 'MyTypes' {

    export type role = "register" | "visitor" | ""

    export interface IAccountState {
        name: string;
        role: role
    }

    export interface ILoginAndRegister {
        account: string,
        password: string,
        name?: string
    }
}