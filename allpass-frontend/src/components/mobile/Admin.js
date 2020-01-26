import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';
import { CREATE_USER_DIALOG } from '../../constants/dialogConstants';
import {openDialog} from '../../actions/dialogActions';
import {getUsers} from '../../actions/adminActions';
import UserList from './UserList';
import Grid from '@material-ui/core/Grid';

class Admin extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    if(this.props.decodedJWT && this.props.decodedJWT.role !== 'ROLE_ADMIN') {
      this.props.history.push('/mobile/home');
    } else {
      this.props.getUsers();
    }
  }

  render() {
    return (
      <Grid container style={{marginTop: 0, padding: 16}} spacing={2}>
        <Grid item xs={7}>
          <Typography variant="h6">
            Admin
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button size="small" color="primary"
            onClick={() => {
              this.props.openDialog(CREATE_USER_DIALOG);
            }}
          >
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    decodedJWT: state.login.decodedJWT
});

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => dispatch(openDialog(dialog)),
    getUsers: () => dispatch(getUsers())
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
)