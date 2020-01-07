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

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 14
//   }
// }))(TableCell);


// const customColumnStyle = {
//   overflow: "hidden",
//   maxWidth: "1px"
// };

class MobileApp extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false
    }
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
        <div id="mobileApp">
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
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.drawer} onClose={() => {this.setState({drawer: !this.state.drawer})}}>
              <List>
                <ListItem button>
                  <ListItemText primary={'text'} />
                </ListItem>
              </List>
          </Drawer>
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
    getData: () => dispatch(getData())
  };
};

const mapStateToProps = state => ({
  data: state.data.data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileApp);