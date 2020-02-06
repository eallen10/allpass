import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';
import { CREATE_USER_DIALOG } from '../../constants/dialogConstants';
import { openDialog } from '../../actions/dialogActions';
import { getUsers } from '../../actions/adminActions';
import UserList from './UserList';
import Grid from '@material-ui/core/Grid';
import { generateApiKey } from '../../actions/adminActions';
import TextField from '@material-ui/core/TextField';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '../../../src/config';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { usersFilter } from '../../actions/adminActions';

const renderLength = 25;

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      apiKeyCopied: false,
      scrollLength: renderLength
    };
  }

  componentDidMount() {
    if (this.props.decodedJWT && this.props.decodedJWT.role !== 'ROLE_ADMIN') {
      this.props.history.push('/desktop/home');
    } else {
      this.props.getUsers();
    }
  }

  handleChange = event => {
    this.setState({ scrollLength: renderLength });
    this.props.usersFilter(event.target.value);
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
    if (props.users) {
      return {
        users: props.users.slice(0, state.scrollLength)
      };
    }
  }

  render() {
    let apiUrl = this.props.apiKey
      ? config.frontend.networkInterface + '/newUser/' + this.props.apiKey
      : '';
    return (
      <div id='desktopHomeContent' onScroll={this.handleScroll}>
        <Grid container style={{ marginTop: 0, padding: 16 }} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Admin</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant='h6'>API</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                this.props.generateApiKey();
              }}>
              Generate Url
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='outlined-multiline-static'
              disabled={!this.props.apiKey}
              label='Api Key Url'
              value={apiUrl}
              defaultValue="Click 'Generate Url'"
              variant='outlined'
              margin='dense'
            />
          </Grid>
          <Grid item xs={3}>
            <div hidden={!this.props.apiKey}>
              <ClickAwayListener
                onClickAway={() => this.setState({ apiKeyCopied: false })}>
                <div>
                  <CopyToClipboard
                    text={apiUrl}
                    onCopy={() => this.setState({ apiKeyCopied: true })}>
                    <Button variant='contained' size='small' color='primary'>
                      {this.state.apiKeyCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </CopyToClipboard>
                </div>
              </ClickAwayListener>
            </div>
          </Grid>
          <Grid item xs={9} />
          <Grid item xs={7}>
            <Typography variant='h6'>Users</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                this.props.openDialog(CREATE_USER_DIALOG);
              }}>
              Create User
            </Button>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <UserList users={this.state.users ? this.state.users : []} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  decodedJWT: state.login.decodedJWT,
  apiKey: state.admin.apiKey,
  users: state.admin.filteredUsers
});

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => dispatch(openDialog(dialog)),
    getUsers: () => dispatch(getUsers()),
    generateApiKey: () => dispatch(generateApiKey()),
    usersFilter: filter => dispatch(usersFilter(filter))
  };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Admin));
