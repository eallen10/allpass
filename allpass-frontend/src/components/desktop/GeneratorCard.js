import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withCookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class GeneratorCard extends Component {
  constructor() {
    super();
    this.state = {
      pLength: 10,
      pUppLetters: false,
      pLowLetters: true,
      pNums: true,
      pChars: false,
      strengthMeter: 3
    };
  }

  static getDerivedStateFromProps(props, state) {
    let length = state.pLength,
      charset = '',
      randStr = '',
      strength = 0;
    if (state.pLowLetters) {
      charset += 'abcdefghijklmnopqrstuvwxyz';
      strength += 10;
    }
    if (state.pUppLetters) {
      charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      strength += 10;
    }
    if (state.pNums) {
      charset += '0123456789';
      strength += 5;
    }
    if (state.pChars) {
      charset += '!@#$%^&*()_-+=';
      strength += 5;
    }
    if (strength === 0) {
      return {
        pGen: '',
        pStrength: 0
      };
    }
    strength += Math.pow(1.3, length);
    for (var i = 0, n = charset.length; i < length; ++i) {
      randStr += charset.charAt(
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * n
        )
      );
    }
    return {
      pGen: randStr,
      pStrength: strength
    };
  }

  render() {
    let strengthMeter = strength => {
      let color = '#ff0000';
      let length = 5;
      if (strength > 99) {
        color = '#1bc700';
        length = 85;
      } else if (strength > 84) {
        color = '#26ff00';
        length = 70;
      } else if (strength > 69) {
        color = '#b7ff00';
        length = 55;
      } else if (strength > 54) {
        color = '#ffff00';
        length = 40;
      } else if (strength > 39) {
        color = '#ffae00';
        length = 25;
      } else if (strength > 24) {
        color = '#ff5900';
        length = 10;
      }
      return [
        <div
          key='meter'
          style={{
            marginTop: '5px',
            marginLeft: '10px',
            height: '8px',
            width: length + '%',
            backgroundColor: color
          }}
        ></div>
      ];
    };
    return (
      <Card style={{ height: '460px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Generator</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='outlined-multiline-static'
                label='Password'
                multiline
                maxrows='7'
                variant='outlined'
                margin='dense'
                value={this.state.pGen}
              />
              <div
                id='pStrengthMeter'
                style={{ display: 'flex', marginLeft: '2px' }}
              >
                <Typography variant='caption'>strength</Typography>
                {strengthMeter(this.state.pStrength)}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography id='discrete-slider' gutterBottom>
                Length
              </Typography>
              <Slider
                defaultValue={this.state.pLength}
                aria-labelledby='discrete-slider-small-steps'
                step={1}
                marks
                min={6}
                max={20}
                onChange={(event, newValue) => {
                  if (newValue !== this.state.pLength) {
                    this.setState({ pLength: newValue });
                  }
                }}
                valueLabelDisplay='auto'
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.pLowLetters}
                      onChange={event =>
                        this.setState({ pLowLetters: event.target.checked })
                      }
                      color='primary'
                    />
                  }
                  label='Lowercase'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.pUppLetters}
                      onChange={event =>
                        this.setState({ pUppLetters: event.target.checked })
                      }
                      color='primary'
                    />
                  }
                  label='Uppercase'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.pNums}
                      onChange={event =>
                        this.setState({ pNums: event.target.checked })
                      }
                      color='primary'
                    />
                  }
                  label='Numbers'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.pChars}
                      onChange={event =>
                        this.setState({ pChars: event.target.checked })
                      }
                      color='primary'
                    />
                  }
                  label='Characters'
                />
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(GeneratorCard)
);
