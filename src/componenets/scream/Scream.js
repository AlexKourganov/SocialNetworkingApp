import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import ChatIcon from '@material-ui/icons/Chat';
import Box from '@material-ui/core/Box';

import {connect} from 'react-redux';
import {likeScream,unlikeScream} from '../../redux/actions/dataActions';
import DeleteScream from '../scream/DeleteScream';
import ScreamDialog from '../scream/ScreamDialog';
import LikeButton from '../scream/LikeButton';







const styles =(theme)=> ({
    ...theme.spreadThis,
  profileimage:{
    minWidth:200,
    [theme.breakpoints.down('xs')]: {
      height:'50px',
      width:'50px',
      borderRadius:'50%',
      minWidth:50,
      marginTop:'17px'
    },
         
  },
  cardtext:{
    [theme.breakpoints.down('xs')]: {
        fontSize:'0.8em'
    }
  }
  });

class Scream extends Component {
  





    render() {
        dayjs.extend(relativeTime);


        const {classes, scream : {body,createdAt,userImage,userHandle,screamId,likeCount,commentCount},user:{authenticated,credentials:{handle}}} = this.props;

        


        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ):(
            null
        )
        
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile Image"
                    className={classes.profileimage}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>

                    <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    >
                    
                    <LikeButton screamId={screamId}/>

                    
                    <span className={classes.cardtext}>{likeCount} Likes</span>
                    

                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    
                    <span className={classes.cardtext}>{commentCount} comments</span>
                    
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    </Box>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool
    
  };

const mapStateToProps = (state)=>({
    user:state.user,
    
    
  });
const mapActionsToProps = {
    likeScream,
    unlikeScream
}  

export default connect(mapStateToProps,mapActionsToProps) (withStyles(styles)(Scream));
