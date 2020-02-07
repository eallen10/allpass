import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import RecordsCard from './RecordsCard';
import GeneratorCard from './GeneratorCard.js';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id='desktopHomeContent'>
        <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Home</Typography>
          </Grid>
          <Grid item xs={6}>
            <RecordsCard />
          </Grid>
          <Grid item xs={6}>
            <GeneratorCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Home));
