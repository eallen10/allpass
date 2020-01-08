import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MobileApp from './mobile/MobileApp';
import DesktopApp from './desktop/DesktopApp';
import { withCookies } from 'react-cookie';
import { assignJWT } from '../actions/loginActions';
import { connect } from 'react-redux';
import {
  isMobile
} from "react-device-detect";

class AppComponent extends React.Component {
  UNSAFE_componentWillMount() {
    let jwt = this.props.cookies.get('jwt');
    if (jwt) {
      this.props.assignJWT(jwt);
      if (isMobile) {
        this.props.history.push("/app/mobile");
      } else {
        this.props.history.push("/app/desktop");
      }
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div id="app">
        <Switch>
          <Route path="/app/mobile" component={MobileApp} />
          <Route path="/app/desktop" component={DesktopApp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  assignJWT: jwt => dispatch(assignJWT(jwt))
});

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(AppComponent)
);
