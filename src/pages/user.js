import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../componenets/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../componenets/profile/StaticProfile';
import {connect} from 'react-redux';
import {getUserData} from  '../redux/actions/dataActions';



class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
           profile:null,
           error:null
        };  
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
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

        const screamsMarkup = loading ? (
            <p>Loading data ... </p>
        ): screams === null ? (
            <p>No Posts from this user</p>
        ) : (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        )



        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {  this.state.error !== null ? (
                        <p>No Profile Has Been Found</p>
                    ) :
                    
                    this.state.profile === null ? (
                        <p>Loading profile...</p>
                    ):(
                        <StaticProfile profile={this.state.profile}   />
                    )}
                    
                </Grid>
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
