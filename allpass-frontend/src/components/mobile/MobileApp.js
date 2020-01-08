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
    this.props.history.push('/app/mobile/logs');
  }

  handleLogout() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //remove jwt cookie
    this.props.logout(); //logout from redux state
    this.props.history.push('/app/login');
  }

  render() {
    console.log("render mobile app")
    return (
        <div id="mobileApp">
          <TopAppBar />
          <MainDrawer />
          <Switch> 
            <Route path="/app/mobile/logs" component={Logs} />
            <Route path="/app/mobile/account" component={Account} />  
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

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MobileApp)
)