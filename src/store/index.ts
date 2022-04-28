import { RootActions, RootState, Services } from 'MyTypes';
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import sevices from "@services/index";
import rootEpic from "./root-epics";
import rootReducer from "./root-reducer";


const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState,
  Services
>({
  dependencies: sevices
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic); // 必须放在store生成后启动

export default store;