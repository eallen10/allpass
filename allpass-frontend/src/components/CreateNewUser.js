import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import {closeDialog} from '../actions/dialogActions';
import {createNewUser} from '../actions/adminActions';
import Grid from '@material-ui/core/Grid';

class CreateNewUser extends React.Component {
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
    const { fname, lname, email, username, pass1, pass2 } = this.state;
    if (fname && lname && email && username && pass1 && pass2) {
      this.props.createNewUser(fname, lname, email, username, pass1, pass2);
    }
  }

  render() {
    return (
      <Grid container style={{marginTop: 0, padding: 16}} spacing={2}>
        <Grid item xs={7}>
        <TextField
            autoFocus
            margin="dense"
            name="fname"
            label="First Name"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="lname"
            label="Last Name"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
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
            name="pass1"
            label="Password"
            type="password"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="pass2"
            label="Password"
            type="password"
            onChange={this.handleChange}
            fullWidth
          />
          <Button onClick={() => this.handleSubmit()} color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
  );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(closeDialog()),
    createNewUser: (fname, lname, email, username, pass1, pass2) => 
        dispatch(createNewUser(fname, lname, email, username, pass1, pass2)) 
  };
};

const mapStateToProps = state => ({
  dialog: state.dialog.dialog
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewUser);