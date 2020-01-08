import { TOGGLE_DRAWER } from "../constants/drawerConstants";

export const toggleDrawer = open => ({
    type: TOGGLE_DRAWER,
    open: open
});