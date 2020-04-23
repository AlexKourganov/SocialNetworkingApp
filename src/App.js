import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';
import axios from 'axios';
// Import MUI theme
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import Navbar from './componenets/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userActions';



// MUI THEME
const theme = createMuiTheme(themeFile);


const token = localStorage.FBIdToken;
console.log('I am being called before token expire check!');

if(token){
  const decodedToken = jwtDecode(token);
  console.log('I am being called insie App.js');
  if(decodedToken.exp * 1000 < Date.now()){
    // means the token has exppired
    store.dispatch(logoutUser());
    
  }else{
    store.dispatch({
      type:SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
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
          <AuthRoute exact path='/login' component={login} />
          <AuthRoute exact path='/signup' component={signup}/>
          <Route exact path='/users/:handle' component={user}/>
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
