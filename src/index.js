import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo500, indigo700, grey400} from 'material-ui/styles/colors';
import Login from './components/Login';
import AppBar from 'material-ui/AppBar';

import './sass/main.sass';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: grey400
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        titleStyle={{
          fontWeight: 300
        }}
      />
      <Login />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('container'));
