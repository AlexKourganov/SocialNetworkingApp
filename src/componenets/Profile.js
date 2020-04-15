import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {logoutUser,uploadImage} from '../redux/actions/userActions';
// MUI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { Paper} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from  '@material-ui/icons/LocationOn';
import LinkIcon from  '@material-ui/icons/Link';
import EditIcon from  '@material-ui/icons/Edit';
import CalendarToday from  '@material-ui/icons/CalendarToday';




const styles = {
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
};

class Profile extends Component {
    handleImageChange = (event) =>{
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image',image,image.name);
        console.log(formData);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }


    render() {
        const { classes,user:{credentials:{handle,createdAt,imageUrl,bio,website,location},loading,authenticated}} = this.props;


        let profileMarkup = !loading ? (authenticated ?  
            (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className='image-wrapper'>
                            <img src={imageUrl} alt='image' className='profile-image' />
                            <input type="file" id='imageInput' onChange={this.handleImageChange} hidden='hidden' />
                            <Tooltip title='Edit Profile Picture' placement='top'>
                            <IconButton onClick={this.handleEditPicture} className='button'>
                                <EditIcon color='primary'></EditIcon>
                            </IconButton>
                            </Tooltip>
                        </div>
                        <hr/>
                        <div className='profile-details'>
            <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>@{handle}</MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                            <LocationOn color="primary"/><span>{location}</span>
                            <hr/> 
                            </Fragment>
                           
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color='primary'/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color='primary' />{' '}
                        <span>Joined  {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No Profile Found, Please Login Again
                        <div className={classes.buttons}>
                            <Button variant='contained' color='primary' component={Link} to="/login">Login</Button>
                            <Button variant='contained' color='secondary' component={Link} to="/signup">Signup</Button>
                        </div>
                    </Typography>
                </Paper>
            ) ) : (<p>loading...</p>)


        return profileMarkup;
    }
}

const mapStateToProps = (state) =>({
    user:state.user
});

const mapActionsToProps = {logoutUser,uploadImage};

Profile.propTypes = {
  
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired,
    uploadImage:PropTypes.func.isRequired

  };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
