import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';
import { CREATE_USER_DIALOG } from '../../constants/dialogConstants';
import {openDialog} from '../../actions/dialogActions';
import {getUsers} from '../../actions/adminActions';
import UserList from './UserList';
import Grid from '@material-ui/core/Grid';
import {generateApiKey} from '../../actions/adminActions';
import TextField from '@material-ui/core/TextField';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import config from '../../../src/config'
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      apiKeyCopied: false
    }
  }

  componentWillMount() {
    if(this.props.decodedJWT && this.props.decodedJWT.role !== 'ROLE_ADMIN') {
      this.props.history.push('/mobile/home');
    } else {
      this.props.getUsers();
    }
  }

  render() {
    let apiUrl = this.props.apiKey ? config.frontend.networkInterface + '/newUser/' + this.props.apiKey : '';
    return (
      <Grid container style={{marginTop: 0, padding: 16}} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Admin
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6">
            API
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button size="small" color="primary"
            onClick={() => {
              this.props.generateApiKey();
            }}
          >
            Generate Url
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            disabled={!this.props.apiKey}
            label="Api Key Url"
            value={apiUrl}
            defaultValue="Click 'Generate Url'"
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item xs={3}>
          <div hidden={!this.props.apiKey}>
            <ClickAwayListener onClickAway={() => this.setState({apiKeyCopied: false})}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  // onClose={() => this.setState({apiKeyCopied: false})}
                  open={this.state.apiKeyCopied}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  arrow
                  placement="right"
                  title="Copied!"
                >
                  <CopyToClipboard 
                    text={apiUrl}
                    onCopy={() => this.setState({apiKeyCopied: true})}
                  >
                    <Button 
                      variant="contained"
                      size="small" 
                      color="primary"
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </div>
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={7}>
          <Typography variant="h6">
            Users
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button size="small" color="primary"
            onClick={() => {
              this.props.openDialog(CREATE_USER_DIALOG);
            }}
          >
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    decodedJWT: state.login.decodedJWT,
    apiKey: state.admin.apiKey
});

const mapDispatchToProps = dispatch => {
  return {
    openDialog: dialog => dispatch(openDialog(dialog)),
    getUsers: () => dispatch(getUsers()),
    generateApiKey: () => dispatch(generateApiKey())
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
)