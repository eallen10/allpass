import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import DetailsCard from './DetailsCard';

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5'>Account</Typography>
        </Grid>
        <Grid item xs={6}>
          <DetailsCard />
        </Grid>
      </Grid>
    );
  }
}

export default withCookies(connect(null, null)(Account));
