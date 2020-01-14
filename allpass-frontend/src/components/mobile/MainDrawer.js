import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {toggleDrawer} from '../../actions/drawerActions';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {changeDrawer} from '../../actions/drawerActions';

class MainDrawer extends Component {
  constructor() {
    super();
    this.state = {}
  }

  adminView = () => {
    if (this.props.decodedJWT.role === 'ROLE_ADMIN') {
      return [
        <ListItem 
          style={this.props.drawer === 'admin' ? {backgroundColor: '#ff00001a'} : {backgroundColor: 'transparent'}} 
          onClick={() => {
            this.props.changeDrawer('admin');
            this.props.history.push('/mobile/admin');
          }} 
          button
        >
          <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
          <ListItemText primary={'Admin'} />
        </ListItem>
      ]
    } else {
      return null;
    }
  }

  render() {
    return (
        <Drawer open={this.props.open} onClose={() => {this.props.toggleDrawer(false)}}>
            <List>
              <ListItem 
                style={this.props.drawer === 'home' ? {backgroundColor: '#ff00001a'} : {backgroundColor: 'transparent'}} 
                onClick={() => {
                  this.props.changeDrawer('home');
                  this.props.history.push('/mobile/home');
                }}
                button
              >
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem 
                style={this.props.drawer === 'account' ? {backgroundColor: '#ff00001a'} : {backgroundColor: 'transparent'}} 
                onClick={() => {
                  this.props.changeDrawer('account');
                  this.props.history.push('/mobile/account');
                }}
                button
              >
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary={'Account'} />
              </ListItem>
              {this.adminView()}
            </List>
        </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: open => dispatch(toggleDrawer(open)),
    changeDrawer: drawer => dispatch(changeDrawer(drawer))
  };
};

const mapStateToProps = state => {
    return {
      open: state.drawer.open,
      decodedJWT: state.login.decodedJWT,
      drawer: state.drawer.drawer
    };
  };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainDrawer)
)