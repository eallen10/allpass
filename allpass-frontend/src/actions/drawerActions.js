import { TOGGLE_DRAWER, CHANGE_DRAWER } from '../constants/drawerConstants';

export const toggleDrawer = open => ({
  type: TOGGLE_DRAWER,
  open: open
});

export const changeDrawer = drawer => ({
  type: CHANGE_DRAWER,
  drawer: drawer
});
