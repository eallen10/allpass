import {
    CLOSE_DIALOG,
    OPEN_DIALOG,
    OPEN_DIALOG_WITH_ARGS
  } from '../constants/dialogConstants';
  
  export const openDialog = dialog => ({
    type: OPEN_DIALOG,
    dialog: dialog
  });
  
  export const openDialogWithArgs = (dialog, args) => ({
    type: OPEN_DIALOG_WITH_ARGS,
    dialog: dialog,
    args: args
  });
  
  export const closeDialog = () => ({
    type: CLOSE_DIALOG,
    dialog: null
  });