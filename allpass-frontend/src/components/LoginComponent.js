import React from 'react';
import '../css/LoginComponent.css';
import '../css/index.css';
import logo from '../images/logo.png';
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
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  detect = () => {
    if(isMobile) {
      return "/mobile"
    } else {
      return "/desktop"
    }
  }

  componentDidUpdate() {
    if (this.props.jwt && this.props.decodedJWT.exp * 1000 > new Date().getTime()) {
      this.props.history.push(this.detect());
    }
  }

  UNSAFE_componentWillMount() {
    //TODO: need to validate jwt
    if(this.props.jwt && this.props.decodedJWT.exp * 1000 > new Date().getTime()) {
      this.props.history.push(this.detect());
    }
  }
  render() {
    return (
      <div id="loginDivOuter">
        <img src={logo} alt="" id="loginLogo" />
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
            type="password"
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