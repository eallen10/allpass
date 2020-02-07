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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { usersFilter } from '../../actions/adminActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const renderLength = 15;

class UsersCard extends Component {
  constructor() {
    super();
    this.state = {
      apiKeyCopied: false,
      scrollLength: renderLength
    };
  }

  componentDidMount() {
    this.props.getUsers();
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
    } else {
      return {
        users: []
      };
    }
  }

  render() {
    return (
      <Card style={{ height: '460px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant='h6'>Users</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                size='small'
                color='primary'
                onClick={() => {
                  this.props.openDialog(CREATE_USER_DIALOG);
                }}
              >
                Create User
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
              <UserList users={this.state.users ? this.state.users : []} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.filteredUsers
});

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => dispatch(openDialog(dialog)),
    getUsers: () => dispatch(getUsers()),
    usersFilter: filter => dispatch(usersFilter(filter))
  };
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(UsersCard)
);
