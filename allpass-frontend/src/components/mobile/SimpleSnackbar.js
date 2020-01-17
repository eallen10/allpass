import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import {closeSnackbar} from '../../actions/snackbarActions';

function SimpleSnackbar(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={() => props.closeSnackbar()}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => props.closeSnackbar()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      closeSnackbar: () => dispatch(closeSnackbar())
    };
  };
  
  const mapStateToProps = state => ({
    open: state.snackbar.open,
    message: state.snackbar.message
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SimpleSnackbar);