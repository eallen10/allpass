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

class AddLogDialog extends React.Component {
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
    const { account, username, pass } = this.state;
    if (account && username && pass) {
      this.props.addData(account, username, pass);
    }
  }

  render() {
    return (
      <Dialog open={this.props.dialog === 'ADD_LOG_DIALOG'} onClose={() => this.props.closeDialog()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add an Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide the information below to add an Account record
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="account"
            label="Account Name"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="pass"
            label="Password"
            type="password"
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeDialog()}>
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(closeDialog()),
    addData: (account, username, password) => dispatch(addData(account, username, password))
  };
};

const mapStateToProps = state => ({
  dialog: state.dialog.dialog
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLogDialog);