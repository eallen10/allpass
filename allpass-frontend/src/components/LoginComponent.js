import React from 'react';
import '../css/LoginComponent.css';
import '../css/index.css';
import larkspear_logo from '../images/logo.png';
import { login } from '../actions/loginActions';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { assignJWT } from '../actions/loginActions';
import {
  isMobile
} from "react-device-detect";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit() {
    console.log("submit login")
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  detect = () => {
    if(isMobile) {
      return "/app/mobile"
    } else {
      return "/app/desktop"
    }
  }

  componentDidUpdate() {
    console.log('LoginComponent did update')
    console.log('(LoginComponent did update) cookie jwt: ' + this.props.cookies.get('jwt'))
    console.log('(LoginComponent did update) cookie expiration: ' + this.props.cookies.get('expires'))
    if (this.props.jwt && this.props.decodedJWT.exp * 1000 > new Date().getTime()) {
      console.log('jwt detected, pushing' + this.detect())
      this.props.history.push(this.detect());
    }
  }

  UNSAFE_componentWillMount() {
    console.log('LoginComponent will mount')
    //TODO: need to validate jwt
    console.log('(LoginComponent will mount) cookie jwt: ' + this.props.cookies.get('jwt'))
    console.log('(LoginComponent will mount) cookie expiration: ' + this.props.cookies.get('expires'))
    console.log(new Date().getTime());
    console.log(this.props.decodedJWT)
    // if (this.props.jwt) {
      if(this.props.jwt && this.props.decodedJWT.exp * 1000 > new Date().getTime()) {
        this.props.history.push(this.detect());
      // }
    }
  }
  render() {
    return (
      <div id="loginDivOuter">
        <img src={larkspear_logo} alt="" id="loginLogo" />
        <div id="loginDivInner">
          <TextField
            name="username"
            label="username"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <TextField
            name="password"
            label="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button 
            className="loginButton"
            variant="contained" 
            color="primary"
            onClick={() => { this.handleSubmit()}}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    assignJWT: jwt => dispatch(assignJWT(jwt))
  };
};

const mapStateToProps = state => {
  return {
    decodedJWT: state.login.decodedJWT,
    jwt: state.login.jwt
  };
};

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired
};

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent)
);