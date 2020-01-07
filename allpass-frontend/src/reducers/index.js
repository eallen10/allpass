import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer
});

export default rootReducer;