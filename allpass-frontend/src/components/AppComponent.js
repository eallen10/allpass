import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MobileApp from './mobile/MobileApp';
import DesktopApp from './desktop/DesktopApp';
import { withCookies } from 'react-cookie';
import { assignJWT } from '../actions/loginActions';
import { logout } from '../actions/loginActions';
import { connect } from 'react-redux';
import LoginComponent from './LoginComponent'

class AppComponent extends React.Component {

  UNSAFE_componentWillMount() {
    // console.log('AppComponent will mount')
    //TODO: need to validate jwt
    // console.log('(AppComponent will mount) cookie jwt: ' + this.props.cookies.get('jwt'))
    // if (this.props.cookies.get('jwt')) {
    //   this.props.assignJWT(this.props.cookies.get('jwt'));
    // }
    this.props.history.push('/app/login')
  }

  render() {
    return (
      <div id="app">
        <Switch> 
          <Route path="/app/login" component={LoginComponent} />        
          <Route path="/app/mobile" component={MobileApp} />
          <Route path="/app/desktop" component={DesktopApp} />
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

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent)
);
