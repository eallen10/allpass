import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
import drawerReducer from './drawerReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
    drawer: drawerReducer
});

export default rootReducer;