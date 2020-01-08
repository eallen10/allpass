import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';

class Account extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div id="accountContent">
        <div id="accountTitle" style={{margin: '14px'}}>
          <Typography variant="h6">
            Account
          </Typography>
        </div>
        <div id="accountDiv" style={{margin: '0 20px 0 20px'}}>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withCookies(
  connect(
    mapStateToProps,
    null
  )(Account)
)