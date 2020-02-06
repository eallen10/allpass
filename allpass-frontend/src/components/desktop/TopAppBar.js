import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/loginActions';

class TopAppBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleLogout() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //remove jwt cookie
    this.props.logout(); //logout from redux state
    this.props.history.push('/login');
  }

  render() {
    return (
      <AppBar position='fixed' style={{ zIndex: '1201' }}>
        <Toolbar style={{ minHeight: '56px' }}>
          <Typography variant='h6'>PersonalPass</Typography>
          <IconButton
            aria-label='display more actions'
            edge='end'
            color='inherit'
            style={{ marginLeft: 'auto' }}
            onClick={() => this.handleLogout()}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => {
  return {
    open: state.drawer.open
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopAppBar)
);
