import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Account</Typography>
        </Grid>
        <Grid item xs={6}>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemText
                primary={'First Name'}
                secondary={this.props.decodedJWT.fname}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemText
                primary={'Last Name'}
                secondary={this.props.decodedJWT.lname}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemText
                primary={'Email'}
                secondary={this.props.decodedJWT.email}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemText
                primary={'Username'}
                secondary={this.props.decodedJWT.username}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  decodedJWT: state.login.decodedJWT
});

export default withCookies(connect(mapStateToProps, null)(Account));
