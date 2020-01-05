import React from 'react';
// import { TextField, TextFieldIcon } from '@rmwc/textfield';
// import { Button } from '@rmwc/button';
import '../css/LoginComponent.css';
import '../css/index.css';
import larkspear_logo from '../images/logo.png';
import { TextField, Button } from '@material-ui/core';

class LoginComponent extends React.Component {
  
  render() {
    return (
      <div id="loginDivOuter">
        <img src={larkspear_logo} alt="" id="loginLogo" />
        <div id="loginDivInner">
          <TextField
            label="username"
            onChange={this.handleChange}
          />
          <TextField
            label="password"
            onChange={this.handleChange}
          />
          <Button 
            className="loginButton"
            variant="contained" 
            color="primary"
          >
            Login
          </Button>
        </div>
        {/* <div id="loginDivInner">
          <form onSubmit={this.handleSubmit}>
            <div>
              <Typography use="caption">
                <span hidden={this.props.loginSuccess} id="invalidCred">
                  Invalid username and/or password.
                </span>
              </Typography>
            </div>
            <TextField
              inputStyle={{
                textAlign: 'right'
              }}
              required
              withTrailingIcon={<TextFieldIcon use="account_box" />}
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <TextField
              style={{ textAlign: 'center' }}
              required
              withTrailingIcon={<TextFieldIcon use="lock" />}
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <Button raised>Login</Button>
          </form>
        </div> */}
      </div>
    );
  }
}

export default LoginComponent;