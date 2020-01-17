import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from '../constants/snackbarConstants';

export const openSnackbar = message => ({
  type: OPEN_SNACKBAR,
  message: message
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
});