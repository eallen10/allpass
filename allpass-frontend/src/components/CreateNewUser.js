import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import {closeDialog} from '../actions/dialogActions';
import {createNewUser} from '../actions/newUserActions';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class CreateNewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: "testname",
      lname: "testlastname",
      email: "testemail",
      username: "admins",
      pass1: "password",
      pass2: "password"
    }
  }

  componentDidMount() {
    var id = this.props.match.params.id
    this.setState({apiKey: id})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  handleSubmit() {
    const { fname, lname, email, username, pass1, pass2, apiKey } = this.state;
    if (fname && lname && email && username && pass1 && pass2 && apiKey) {
      this.props.createNewUser(fname, lname, email, username, pass1, pass2, apiKey);
    }
  }

  render() {
    let requestMessage = () => {
      if(this.props.createSuccess === undefined) {
        return null
      } else if (this.props.createSuccess) {
        return [
          <Typography>Success! Click 'Login' and login using your username and password</Typography>
        ]
      } else {
        return [
          <Typography>{this.props.errorMessage}</Typography>
        ]
      }
    }
    let formButton = () => {
      if(this.props.createSuccess === null || !this.props.createSuccess) {
        return [
            <Button onClick={() => this.handleSubmit()} color="primary">
              Create
            </Button>
        ]
      } else {
        return [
            <Button onClick={() => this.props.history.push('/login')} color="primary">
              Login
            </Button>
        ]
      }
    }
    return (
      <div id="newUserForm" style={{width: "300px", position: "absolute", left: "calc(50% - 150px"}}>
        <Grid container style={{marginTop: 0, padding: 16}} spacing={2}>
          <Grid item xs={12}>
            <Typography>
              You have been given permission to create an account. Please provide
              the information below to create an account.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                autoFocus
                margin="dense"
                name="fname"
                label="First Name"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                required
                autoFocus
                margin="dense"
                name="lname"
                label="Last Name"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                required
                autoFocus
                margin="dense"
                name="email"
                label="Email Address"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                required
                inputProps={{
                  autoComplete: "new-password"
                }}
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                required
                inputProps={{
                  autoComplete: "new-password"
                }}
                autoFocus
                margin="dense"
                name="pass1"
                label="Password"
                type="password"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                required
                autoFocus
                margin="dense"
                name="pass2"
                label="Password"
                type="password"
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  disabled
                  multiline
                  rows={4}
                  margin="dense"
                  name="apiKey"
                  label="API Key"
                  value={this.state.apiKey}
                  fullWidth
                />
            </Grid>
            <Grid item xs={12}>
              {requestMessage()}
            </Grid>
            <Grid style={{textAlign: 'center'}} item xs={12}>
              {formButton()}
            </Grid>
        </Grid>
      </div>
  );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(closeDialog()),
    createNewUser: (fname, lname, email, username, pass1, pass2, apiKey) => 
        dispatch(createNewUser(fname, lname, email, username, pass1, pass2, apiKey)) 
  };
};

const mapStateToProps = state => ({
  createSuccess: state.newUser.createSuccess,
  errorMessage: state.newUser.errorMessage
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewUser));