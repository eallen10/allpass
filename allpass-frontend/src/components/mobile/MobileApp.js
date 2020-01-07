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

class MobileApp extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
        <div id="mobileApp">
          <TableContainer >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Website</TableCell>
                  <TableCell align="right">Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data ? this.props.data.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.website}
                    </TableCell>
                    <TableCell align="right">{row.pass}</TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
          </TableContainer>
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