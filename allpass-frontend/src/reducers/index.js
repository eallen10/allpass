import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
import drawerReducer from './drawerReducer';
import dialogReducer from './dialogReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
    drawer: drawerReducer,
    dialog: dialogReducer
});

export default rootReducer;