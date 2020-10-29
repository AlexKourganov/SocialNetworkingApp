import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    // maxWidth: "100%",
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height:'50px',
      objectFit: "cover",
      borderRadius: "50%"
    },
    width: 100,

    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    marginLeft: 20,
  },
  commnetContainer:{
    [theme.breakpoints.down('xs')]: {
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
    }
  },
  mainContainer:{
    [theme.breakpoints.down('xs')]: {
      width:'100%'
    }
  }
});

class Comments extends Component {
  render() {
    console.log('INSIDE COMMENTS');
    const { comments, classes } = this.props;
   
    console.log(comments);
    return (
      <Grid container className={classes.mainContainer}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;

          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container className={classes.commnetContainer}>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
