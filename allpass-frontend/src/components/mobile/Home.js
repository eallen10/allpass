import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getData} from '../../actions/dataActions.js';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import LogPanels from './LogPanels';
import Button from '@material-ui/core/Button';
import {openDialog} from '../../actions/dialogActions';
import { ADD_LOG_DIALOG } from '../../constants/dialogConstants.js';
import { decryptPasswords } from '../../actions/dataActions';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false,
      q: ''
    }
  }

  componentDidMount() {
    this.props.getData();
  }

  handleChange = (event) => {
    this.setState({q: event.target.value})
  };

  render() {
    return (
      <Grid container style={{marginTop: 0, padding: 16}} spacing={2}>
        <Grid item xs={7}>
          <Typography variant="h6">
            Home
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button size="small" color="primary" 
            onClick={() => {
              this.props.openDialog(ADD_LOG_DIALOG);
            }}
          >
            Add Account
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="input-with-icon-textfield"
            name="query"
            placeholder="Search"
            onChange={this.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LogPanels q={this.state.q} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getData()),
    openDialog: dialog => dispatch(openDialog(dialog)),
    decryptPasswords: key => dispatch(decryptPasswords(key))
  };
};

const mapStateToProps = state => ({});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)