import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../actions/dataActions.js';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import LogPanels from './LogPanels';
import Button from '@material-ui/core/Button';
import { openDialog } from '../../actions/dialogActions';
import { ADD_LOG_DIALOG } from '../../constants/dialogConstants.js';
import { decryptPasswords } from '../../actions/dataActions';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { recordsFilter } from '../../actions/dataActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const renderLength = 25;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      scrollLength: renderLength
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  handleChange = event => {
    this.setState({ scrollLength: renderLength });
    this.props.recordsFilter(event.target.value);
  };

  handleScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      this.setState({
        scrollLength: this.state.scrollLength + renderLength
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return {
        data: props.data.slice(0, state.scrollLength)
      };
    }
  }

  render() {
    return (
      <div id='desktopHomeContent'>
        <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Home</Typography>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant='h6'>Records</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => {
                        this.props.openDialog(ADD_LOG_DIALOG);
                      }}
                    >
                      Add Account
                    </Button>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: '10px' }}>
                    <TextField
                      id='input-with-icon-textfield'
                      name='query'
                      placeholder='Search'
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    onScroll={this.handleScroll}
                    style={{ height: '325px', overflowY: 'auto' }}
                  >
                    <LogPanels
                      records={this.state.data ? this.state.data : []}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getData()),
    openDialog: dialog => dispatch(openDialog(dialog)),
    decryptPasswords: key => dispatch(decryptPasswords(key)),
    recordsFilter: filter => dispatch(recordsFilter(filter))
  };
};

const mapStateToProps = state => {
  return {
    data: state.data.filteredRecords
  };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Home));
