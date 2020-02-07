import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { logout } from '../../actions/loginActions';
import Home from './Home';
import Account from './Account';
import TopAppBar from './TopAppBar';
import MainDrawer from './MainDrawer';
import RootDialog from './RootDialog';
import Admin from './Admin';
import SimpleSnackbar from './SimpleSnackbar.js';
import '../../css/DesktopApp.css';

class DesktopApp extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (
      this.props.jwt &&
      this.props.decodedJWT.exp * 1000 > new Date().getTime()
    ) {
      this.props.history.push('/desktop/home');
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
    return (
      <div id='desktopApp'>
        <RootDialog />
        <TopAppBar />
        <MainDrawer />
        <div id='desktopContent'>
          <Switch>
            <Route path='/desktop/home' component={Home} />
            <Route path='/desktop/account' component={Account} />
            <Route path='/desktop/admin' component={Admin} />
          </Switch>
        </div>
        <SimpleSnackbar />
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
  connect(mapStateToProps, mapDispatchToProps)(DesktopApp)
);
