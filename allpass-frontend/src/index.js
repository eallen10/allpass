import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import AppComponent from './components/AppComponent';
import { render } from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { CookiesProvider } from 'react-cookie';
import CssBaseline from '@material-ui/core/CssBaseline';
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
  }
});

function App() {
  return (
    <CssBaseline>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CookiesProvider>
          <Provider store={store}>
            <AppComponent />
          </Provider>
        </CookiesProvider>
      </BrowserRouter>
    </ThemeProvider>
    </CssBaseline>
  );
}

render(<App />, document.getElementById('root'));
