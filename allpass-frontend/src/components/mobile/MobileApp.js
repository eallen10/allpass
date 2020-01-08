import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { logout } from '../../actions/loginActions';
import Logs from './Logs';
import Account from './Account';
import TopAppBar from './TopAppBar';
import MainDrawer from './MainDrawer';

class MobileApp extends Component {
  constructor() {
    super();
    this.state = {}
  }

  UNSAFE_componentWillMount() {
    console.log('MobileApp will mount')
    if(this.props.jwt && this.props.decodedJWT.exp * 1000 > new Date().getTime()) {
      this.props.history.push('/mobile/logs');
    } else {
      this.handleLogout();
    }
  }

  handleLogout() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //remove jwt cookie
    this.props.logout(); //logout from redux state
    this.props.history.push('/login');
  }

  render() {
    console.log("render mobile app")
    return (
        <div id="mobileApp">
          <TopAppBar />
          <MainDrawer />
          <Switch> 
            <Route path="/mobile/logs" component={Logs} />
            <Route path="/mobile/account" component={Account} />  
          </Switch>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => {
  return {
    decodedJWT: state.login.decodedJWT,
    jwt: state.login.jwt,
    loginSuccess: state.login.success
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MobileApp)
)