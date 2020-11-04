import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Scream from "../componenets/scream/Scream";
import Profile from "../componenets/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";

import { selectDataScreams, selectDataLoading } from "../redux/data.selector";

import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScreams, updateSliceData } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
  }

  componentDidMount() {
    this.props.getScreams();
  }

  fetchMoreData = () => {
    const { renderScreams, start, end } = this.props.data;
    const { screams } = this.props;

    let tempSliceData = renderScreams.concat(screams.slice(start, end));

    this.props.updateSliceData(tempSliceData);

    if (
      renderScreams.length === screams.length - 7 ||
      renderScreams.length === screams.length
    ) {
      this.setState({ hasMore: false });
    }
  };

  render() {
    // const {screams,loading} = this.props.data;

    const { screams, loading } = this.props;

    //let recentScreamsMarkup = !loading && screams!==null ?
    let recentScreamsMarkup =
      !loading && screams !== null ? (
        screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      ) : (
        <ScreamSkeleton />
      );

    return (
      <Grid container spacing={0}>
        <Hidden only={["sm", "md", "lg", "xl"]}>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Hidden>

        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Hidden only="xs">
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,

  screams: selectDataScreams(state),
  loading: selectDataLoading(state),
});

export default connect(mapStateToProps, { getScreams, updateSliceData })(
  withStyles(styles)(home)
);
