import { combineReducers } from 'redux';

import accountReducers from '@reducers/index';
import tasksReducers from '@reducers/task';

const rootReducer = combineReducers({
    account: accountReducers,
    tasks: tasksReducers
});

export default rootReducer;
