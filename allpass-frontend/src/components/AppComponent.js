import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import { withCookies } from 'react-cookie';
import { assignJWT } from '../actions/loginActions';
import { connect } from 'react-redux';

class AppComponent extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("here")
    let jwt = this.props.cookies.get('jwt');
    if (jwt) {
      this.props.assignJWT(jwt);
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div id="app">
        <div id="content">
          <Switch>
            <Route path="/app/dashboard" component={DashboardComponent} />
          </Switch>
        </div>
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
