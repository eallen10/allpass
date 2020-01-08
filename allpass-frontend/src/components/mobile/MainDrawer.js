import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {toggleDrawer} from '../../actions/drawerActions';

class MainDrawer extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
        <Drawer open={this.props.open} onClose={() => {this.props.toggleDrawer(false)}}>
            <List>
            <ListItem button>
                <ListItemText primary={'Logs'} onClick={() => {
                  this.props.history.push('/app/mobile/logs')
                }} />
            </ListItem>
            <ListItem button>
                <ListItemText primary={'Account'} onClick={() => {
                  this.props.history.push('/app/mobile/account')
                }} />
            </ListItem>
            </List>
        </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: open => dispatch(toggleDrawer(open))
  };
};

const mapStateToProps = state => {
    return {
      open: state.drawer.open
    };
  };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainDrawer)
)