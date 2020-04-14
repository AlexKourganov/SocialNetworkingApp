import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';
// Import MUI theme
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import Navbar from './componenets/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store';




// MUI THEME
const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log('I am being called');
  if(decodedToken.exp * 1000 < Date.now()){
    // means the token has exppired
    window.location.href = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }

}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
    <div className="App">
      <Router>
        <Navbar/>
        <div className='container'>
        <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
          <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
