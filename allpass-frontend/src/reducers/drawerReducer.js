import { TOGGLE_DRAWER, CHANGE_DRAWER } from "../constants/drawerConstants";

    const initialState = {
        open: false,
        drawer: 'home'
    };
    
    const drawerReducer = (state = initialState, action) => {
      switch (action.type) {
        case TOGGLE_DRAWER:
          return {
            ...state,
            open: action.open
          }
        case CHANGE_DRAWER:
          return {
            ...state,
            drawer: action.drawer,
            open: false
          }
        default:
          return {
            ...state
          };
      }
    };
    
    export default drawerReducer;