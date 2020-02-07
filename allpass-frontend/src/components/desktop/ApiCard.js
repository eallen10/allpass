import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import { generateApiKey } from '../../actions/adminActions';
import TextField from '@material-ui/core/TextField';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '../../../src/config';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class ApiCard extends Component {
  constructor() {
    super();
    this.state = {
      apiKeyCopied: false
    };
  }

  render() {
    let apiUrl = this.props.apiKey
      ? config.frontend.networkInterface + '/newUser/' + this.props.apiKey
      : '';
    return (
      <Card style={{ height: '460px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant='h6'>API</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                size='small'
                color='primary'
                onClick={() => {
                  this.props.generateApiKey();
                }}
              >
                Generate Url
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='outlined-multiline-static'
                disabled={!this.props.apiKey}
                label='Api Key Url'
                multiline
                rows='7'
                value={apiUrl}
                variant='outlined'
                margin='dense'
              />
            </Grid>
            <Grid item xs={3}>
              <div hidden={!this.props.apiKey}>
                <ClickAwayListener
                  onClickAway={() => this.setState({ apiKeyCopied: false })}
                >
                  <div>
                    <CopyToClipboard
                      text={apiUrl}
                      onCopy={() => this.setState({ apiKeyCopied: true })}
                    >
                      <Button variant='contained' size='small' color='primary'>
                        {this.state.apiKeyCopied ? 'Copied!' : 'Copy'}
                      </Button>
                    </CopyToClipboard>
                  </div>
                </ClickAwayListener>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  apiKey: state.admin.apiKey
});

const mapDispatchToProps = dispatch => {
  return {
    generateApiKey: () => dispatch(generateApiKey())
  };
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(ApiCard)
);
