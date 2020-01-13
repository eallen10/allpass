import { TOGGLE_DRAWER } from "../constants/drawerConstants";

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
        default:
          return {
            ...state
          };
      }
    };
    
    export default drawerReducer;