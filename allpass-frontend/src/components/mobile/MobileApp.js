import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {getData} from '../../actions/dataActions.js'
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Drawer from '@material-ui/core/Drawer';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withCookies } from 'react-cookie';
import { logout } from '../../actions/loginActions';

class MobileApp extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false
    }
  }

  UNSAFE_componentWillMount() {
    let jwt = this.props.cookies.get('jwt');
    if (jwt === undefined) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.props.getData();
  }

  handleLogout() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //remove jwt cookie
    this.props.logout(); //logout from redux state
    this.props.history.push('/login');
  }

  render() {
    return (
        <div id="mobileApp">
          <Drawer open={this.state.drawer} onClose={() => {this.setState({drawer: !this.state.drawer})}}>
              <List>
                <ListItem button>
                  <ListItemText primary={'text'} />
                </ListItem>
              </List>
          </Drawer>
          <AppBar position="static" style={{ margin: 0 }}>
            <Toolbar>
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                onClick={() => this.setState({drawer: !this.state.drawer})}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                PersonalPass
              </Typography>
              <IconButton 
                aria-label="display more actions" 
                edge="end" color="inherit" 
                style={{marginLeft: 'auto'}}
                onClick={() => this.handleLogout()}
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
            <div id="mobileContent">
              <div id="accountsTitle" style={{margin: '14px'}}>
                <Typography variant="h6">
                  Accounts
                </Typography>
              </div>
              <div id="accountsListSurface" style={{margin: '0 20px 0 20px'}}>
                <Card elevation={3} style={{maxHeight: '80vh', maxWidth: '500px', overflow: 'auto'}}>
                  <CardContent style={{padding: '8px'}}>
                    <List style={{padding: 0}}>
                      {this.props.data ? this.props.data.map(row => (
                        <ListItem button>
                          <ListItemText 
                            style={{textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '80%'}}
                          >
                            <Typography variant="subtitle1">
                              {row.website}
                            </Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <ArrowForwardIosIcon style={{ fontSize: 14 }}/>
                          </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )) : null}
                    </List>
                    {/* <TableContainer >
                      <Table size="med">
                        <TableHead>
                          <TableRow>
                            <TableCell>Account</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.data ? this.props.data.map(row => (
                            <TableRow key={row.name}>
                              <TableCell style={{overflow: "hidden",maxWidth: "1px"}} component="th" scope="row">
                                {row.website}
                              </TableCell>
                            </TableRow>
                          )) : null}
                        </TableBody>
                      </Table>
                    </TableContainer> */}
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getData()),
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => ({
  data: state.data.data
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MobileApp)
)