import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getData} from '../../actions/dataActions.js'
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import LogPanels from './LogPanels';

class Home extends Component {
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
      <div id="logsContent">
        <div id="logsTitle" style={{margin: '19px'}}>
          <Typography variant="h6">
            Home
          </Typography>
        </div>
        <div id="logsListDiv" style={{margin: '0 20px 0 20px'}}>
          <LogPanels />
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

const mapStateToProps = state => ({});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)