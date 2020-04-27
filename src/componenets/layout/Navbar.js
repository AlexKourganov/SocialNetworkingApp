import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
// import Notifications from '@material-ui/icons/Notifications';
import PostScream from '../scream/PostScream';

const styles =(theme)=> ({
    ...theme.spreadThis,
    iconColor:{
        color:'#ffffff'
    },
    buttonColor:{
        // background:'#e0d3dc'
        '&:hover': {
            background: '#961e3e'
         }
    }
  });

class Navbar extends Component {
   

    render() {
        const {classes} = this.props;
        const {authenticated} = this.props;



        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            {/* <MyButton tip='Create Scream' btnClassName={classes.buttonColor}>
                                <AddIcon className={classes.iconColor}/>
                            </MyButton> */}
                            <PostScream/>
                            <Link to='/'>
                            <MyButton tip='Home' btnClassName={classes.buttonColor}>
                                <HomeIcon className={classes.iconColor}/>
                            </MyButton>
                            </Link>
                           
                                <Notifications />
                            
                        </Fragment>
                    ) : (
                        <Fragment>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        <Button color="inherit" component={Link} to='/signup'>SignUp</Button>
                        </Fragment>
                        
                    )}



                   
                </Toolbar>
            </AppBar>
        )
    }
}


Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
   
};


const mapStateToProps = (state)=>({
    authenticated:state.user.authenticated
  })
  

export default connect(mapStateToProps) (withStyles(styles) (Navbar));
