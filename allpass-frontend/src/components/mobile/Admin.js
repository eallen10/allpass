import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';
import { CREATE_USER_DIALOG } from '../../constants/dialogConstants';
import {openDialog} from '../../actions/dialogActions';
import {getUsers} from '../../actions/adminActions';
import UserList from './UserList';

class Admin extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    console.log(this.props.decodedJWT);
    if(this.props.decodedJWT.role !== 'ROLE_ADMIN') {
      this.props.history.push('/mobile/home');
    } else {
      this.props.getUsers();
    }
  }

  render() {
    return (
      <div id="accountContent">
        <div id="accountTitle" style={{margin: '14px'}}>
          <Typography variant="h6">
            Admin
          </Typography>
          <Button size="small" color="primary" style={{float: 'right', marginTop: '-30px'}}
            onClick={() => {
              this.props.openDialog(CREATE_USER_DIALOG);
            }}
              >
              Create User
          </Button>
        </div>
        <div id="accountDiv" style={{margin: '0 20px 0 20px'}}>
          <UserList />
        </div>
      </div>
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