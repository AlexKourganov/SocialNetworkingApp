import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../componenets/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../componenets/profile/StaticProfile';
import {connect} from 'react-redux';
import {getUserData} from  '../redux/actions/dataActions';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import Hidden from '@material-ui/core/Hidden';


class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
           profile:null,
           error:null,
           screamIdParam:null
        };  
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId) this.setState({screamIdParam:screamId});


        this.props.getUserData(handle);
        this.setState({error:null});
        axios.get(`/user/${handle}`)
        .then(res=>{
            this.setState({
                profile:res.data.user
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                error:err.message
            })
        });

    }


    render() {
        const {screams,loading}= this.props.data;
        const {screamIdParam} = this.state;
        console.log(screamIdParam);
        const screamsMarkup = loading ? (
            <ScreamSkeleton/>
        ): (screams.length <1) ? (
            
            <p>No Posts from this user</p>
        ) : !screamIdParam ? (
            
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
            screams.map(scream => {
                if(scream.screamId !== screamIdParam){
                    console.log('no open dialog')
                    return <Scream key={scream.screamId} scream={scream} />
                }else{
                    console.log('open dialog')
                    return <Scream key={scream.screamId} scream={scream} openDialog />
                }
            })
        );
        



        return (
            <Grid container spacing={0}>
                <Hidden only={['sm','md', 'lg','xl']}>
                <Grid item sm={4} xs={12}>
                    {  this.state.error !== null ? (
                        <p>No Profile Has Been Found</p>
                    ) :
                    
                    this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ):(
                        <StaticProfile profile={this.state.profile}   />
                    )}
                    
                </Grid>
                </Hidden>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>

                <Hidden only="xs">
                <Grid item sm={4} xs={12}>
                    {  this.state.error !== null ? (
                        <p>No Profile Has Been Found</p>
                    ) :
                    
                    this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ):(
                        <StaticProfile profile={this.state.profile}   />
                    )}
                    
                </Grid>
                </Hidden>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired 
};

const mapStateToProps = (state)=>({
    data:state.data
});

export default connect(
    mapStateToProps,
    { getUserData }
  )(user);
