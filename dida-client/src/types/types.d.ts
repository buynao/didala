declare module 'MyTypes' {
    /**
     * 全局数据结构
     */
    export interface IStoreState {
        account: IAccountState;
        tasks: IGlobalTask;
    }
}
  