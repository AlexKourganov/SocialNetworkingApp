import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM, LOADING_UI} from '../types';
import axios from 'axios';


export const getScreams = () =>(dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios.get('/screams')
        .then(res => {
            dispatch({
                type:SET_SCREAMS,
                payload:res.data
            })
        }).catch(err =>{
            dispatch({
                type:SET_SCREAMS,
                payload:[]
            })
        })



}

// LIke scream
export const likeScream = (screamId) =>(disptach)=>{
    axios.get(`/scream/${screamId}/like`)
    .then(res =>{
        disptach({
            type:LIKE_SCREAM,
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })
}

// Unlike Scream
export const unlikeScream = (screamId) =>(disptach)=>{
    axios.get(`/scream/${screamId}/unlike`)
    .then(res =>{
        disptach({
            type:UNLIKE_SCREAM,
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })
}