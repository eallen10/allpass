import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MobileApp from './mobile/MobileApp';
import DesktopApp from './desktop/DesktopApp';
import { withCookies } from 'react-cookie';
import { assignJWT } from '../actions/loginActions';
import { logout } from '../actions/loginActions';
import { connect } from 'react-redux';
import LoginComponent from './LoginComponent'
import CreateNewUser from './CreateNewUser';

class AppComponent extends React.Component {

  UNSAFE_componentWillMount() {
    if (this.props.cookies.get('jwt')) {
      this.props.assignJWT(this.props.cookies.get('jwt'));
    }
  }

  render() {
    return (
      <div id="app">
        <Switch>
          <Route path="/mobile" component={MobileApp} />
          <Route path="/desktop" component={DesktopApp} />
          <Route path="/newUser/:id" component={CreateNewUser} />
          <Route path="/login" path="/" component={LoginComponent} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  assignJWT: jwt => dispatch(assignJWT(jwt)),
  logout: () => dispatch(logout())
});

const mapStateToProps = state => {
  return {
    loginSuccess: state.login.success
  };
};

export default withCookies(withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent)
));
