import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import Navbar from './componenets/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// MUI THEME
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#e91e63',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff3d00',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography:{
    useNextVariants:true
  }
});



function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Navbar/>
        <div className='container'>
        <Switch>
          <Route exact path='/' component={home}/>
          <Route exact path='/login' component={login}/>
          <Route exact path='/signup' component={signup}/>
        </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
