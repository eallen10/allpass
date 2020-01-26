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
    console.log('AppComponent will mount')
    // TODO: need to validate jwt
    console.log('(AppComponent will mount) cookie jwt: ' + this.props.cookies.get('jwt'))
    if (this.props.cookies.get('jwt')) {
      this.props.assignJWT(this.props.cookies.get('jwt'));
    }
    this.props.history.push('/login')
  }

  render() {
    return (
      <div id="app">
        <Switch> 
          <Route path="/login" component={LoginComponent} />        
          <Route path="/mobile" component={MobileApp} />
          <Route path="/desktop" component={DesktopApp} />
          <Route path="/newUser" component={CreateNewUser} />
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
