import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import {closeDialog} from '../../actions/dialogActions';
import {addData} from '../../actions/dataActions';
import aes256 from 'aes256';
import { decryptPasswords } from '../../actions/dataActions';

class DecryptDialog extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  handleSubmit() {
    const { mpass } = this.state;
    if (mpass) {
      this.props.decryptPasswords(mpass);
    }
  }

  render() {
    return (
      <Dialog open={this.props.dialog === 'DECRYPT_DIALOG'} onClose={() => this.props.closeDialog()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Decrypt Passwords</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Master Password to decrypt your Account Passwords
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="mpass"
            label="Master Password"
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeDialog()}>
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            Decrypt
          </Button>
        </DialogActions>
      </Dialog>
  );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(closeDialog()),
    decryptPasswords: key => dispatch(decryptPasswords(key))
  };
};

const mapStateToProps = state => ({
  dialog: state.dialog.dialog
});

export default connect(mapStateToProps, mapDispatchToProps)(DecryptDialog);