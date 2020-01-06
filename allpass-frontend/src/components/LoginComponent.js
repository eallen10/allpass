import React from 'react';
import '../css/LoginComponent.css';
import '../css/index.css';
import larkspear_logo from '../images/logo.png';
import { login } from '../actions/loginActions';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // const [name, setName] = React.useState('Cat in the Hat');
  // const handleChange = event => {
  //   setName(event.target.value);
  // };

  handleChange = (event) => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit() {
    const { username, password } = this.state;
    if (username && password) {
      console.log('submit');
      console.log(username);
      console.log(password);
      this.props.login(username, password);
    }
  }

  componentDidUpdate() {
    console.log(this.state.username);
    if (this.props.jwt) {
      this.props.history.push('/app/dashboard');
    }
  }

  UNSAFE_componentWillMount() {
    //TODO: need to validate jwt
    if (this.props.cookies.get('jwt')) {
      this.props.history.push('/app/dashboard');
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
    login: (username, password) => dispatch(login(username, password))
  };
};

const mapStateToProps = state => {
  return {
    jwt: state.login.jwt,
    loginSuccess: state.login.success
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