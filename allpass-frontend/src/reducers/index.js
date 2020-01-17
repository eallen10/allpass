import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
import drawerReducer from './drawerReducer';
import dialogReducer from './dialogReducer';
import adminReducer from './adminReducer';
import snackbarReducer from './snackbarReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
    drawer: drawerReducer,
    dialog: dialogReducer,
    admin: adminReducer,
    snackbar: snackbarReducer
});

export default rootReducer;