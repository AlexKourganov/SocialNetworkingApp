import React, { Component,useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Scream from '../componenets/scream/Scream';
import Profile from '../componenets/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import {selectDataScreams,selectDataLoading} from '../redux/data.selector';

import PropTypes  from 'prop-types';
import {connect} from  'react-redux';
import {getScreams} from '../redux/actions/dataActions';


export class home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // initData: this.state.data.slice(0, 7),
      initData:[],
      start: 7,
      end: 14,
    };  
}



    componentDidMount(){
      console.log('HomePage Mount!');
      this.props.getScreams();
      
    }
   

    static getDerivedStateFromProps(nextProps, prevState){
      console.log('GETTING PROPS!!!!');
      console.log(prevState.initData);
      if(nextProps.screams && (prevState.initData.length !== 0)){
        console.log('1');
        return { data:nextProps.screams};
     }else if(nextProps.screams && prevState.initData.length === 0){
      console.log('2');
      return { data:nextProps.screams, initData:nextProps.screams.slice(0, 7)};
     }
     else return null;
    }


    fetchMoreData = () => {
      console.log('FETCHING MORE DATA');
     
      console.log('BEFORE SLICE!');
      console.log(this.state.data);
      console.log(this.state.initData);
      console.log(this.state.start , this.state.end);
      let tempSliceData = this.state.initData.concat(this.state.data.slice(this.state.start, this.state.end));
      console.log('Temp Slice Data');
      console.log(tempSliceData);

      this.setState({
        initData: tempSliceData,
        start: this.state.start + 7,
        end: this.state.end + 7,
      });

      console.log('AFTER SLICE!');
      console.log(this.state.data);
      console.log(this.state.initData);
      console.log(this.state.start , this.state.end);
    };
 

  render() {
    
    // const {screams,loading} = this.props.data;
    const {screams,loading} = this.props;
    const { data, initData } = this.state;
    console.log(initData);


//let recentScreamsMarkup = !loading && screams!==null ? 
      let recentScreamsMarkup = !loading && initData!==null ? 
  (initData.map(scream => <Scream key={scream.screamId} scream={scream}/>)) : (<ScreamSkeleton/>);


    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>

        <InfiniteScroll
          dataLength={initData.length}
          next={this.fetchMoreData}
          hasMore={true}
          scrollThreshold={1}
          
          loader={<h4>Loading...!</h4>}
        >

          {recentScreamsMarkup}

        </InfiniteScroll>


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
