import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import UsersCard from './UsersCard';
import ApiCard from './ApiCard';

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.decodedJWT && this.props.decodedJWT.role !== 'ROLE_ADMIN') {
      this.props.history.push('/desktop/home');
    }
  }

  render() {
    return (
      <div id='desktopHomeContent'>
        <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Admin</Typography>
          </Grid>
          <Grid item xs={6}>
            <UsersCard />
          </Grid>
          <Grid item xs={6}>
            <ApiCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  decodedJWT: state.login.decodedJWT
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Admin));
