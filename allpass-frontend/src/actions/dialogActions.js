import {
  CLOSE_DIALOG,
  OPEN_DIALOG,
  OPEN_VERIFY_DIALOG,
  YOU_SURE_DIALOG
} from '../constants/dialogConstants';

export const openDialog = dialog => ({
  type: OPEN_DIALOG,
  dialog: dialog
});

export const openVerifyDialog = (title, message, action, object) => ({
  type: OPEN_VERIFY_DIALOG,
  dialog: YOU_SURE_DIALOG,
  title: title,
  message: message,
  action: action,
  object: object
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
  dialog: null
});
