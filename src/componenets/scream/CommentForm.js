import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";


const styles = (theme) => ({
  ...theme.spreadThis,
  progressSpinner:{
    position:'absolute'
},
button:{
  position:'relative'
},
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      errors: {},
    };
  }



  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.UI.errors) {
     
       return {errors: nextProps.UI.errors};
     
    }

    if(!nextProps.UI.errors && !nextProps.UI.loadingbtn){
      return {errors: {}};
    }

  
    
   else return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
    this.setState({
        body: "",
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes, authenticated, UI:{loadingbtn} } = this.props;
    const errors = this.state.errors;

    const commentFormMarkUp = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            
            className={classes.button}
          >
            Submit
            {loadingbtn && ( <CircularProgress size={30} thickness={7} className={classes.progressSpinner} />)}
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkUp;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
