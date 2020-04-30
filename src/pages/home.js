import React, { Component,useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Scream from '../componenets/scream/Scream';
import Profile from '../componenets/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

import {selectDataScreams,selectDataLoading} from '../redux/data.selector';

import PropTypes  from 'prop-types';
import {connect} from  'react-redux';
import {getScreams} from '../redux/actions/dataActions';


export class home extends Component {





    componentDidMount(){
      console.log('HomePage Mount!');
      this.props.getScreams();
      
    }
   




 

  render() {
    
    // const {screams,loading} = this.props.data;
    const {screams,loading} = this.props;
  
   


//let recentScreamsMarkup = !loading && screams!==null ? 
    let recentScreamsMarkup = !loading && screams!==null ? 
  (screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)) : (<ScreamSkeleton/>);


    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
         <Profile/>
        </Grid>
      </Grid>
    );
  }
}


home.propTypes = {
  getScreams:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
};

// const mapStateToProps = (state) =>({
//   data:state.data
// });

const mapStateToProps = (state) =>({
  data:state.data,
  
  screams:selectDataScreams(state),
  loading:selectDataLoading(state)
});







export default connect(mapStateToProps,{getScreams})(home);
