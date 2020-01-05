import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import LoginComponent from './components/LoginComponent';
import 'material-components-web/dist/material-components-web.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
require('dotenv').config();

window.store = store;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ee0000'
    },
    secondary: {
      main: '#0000ee'
    },
  },
  status: {
    danger: '#ee0000',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Provider store={store}>
            <Switch>
              <Route exact path="/login" component={LoginComponent} />
              <Redirect from="/" to="login" />
            </Switch>
          </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
