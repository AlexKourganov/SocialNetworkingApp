import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM, LOADING_UI,DELETE_SCREAM, SET_ERRORS, CLEAR_ERRORS,POST_SCREAM} from '../types';
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
// Post scream
export const postScream = (newScream) =>(dispatch)=>{
    dispatch({type:LOADING_UI});
    axios.post('/scream',newScream)
        .then(res => {
            dispatch({
                type:POST_SCREAM,
                payload:res.data
            });
            dispatch({
                type:CLEAR_ERRORS
                
            });

        })
        .catch(err =>{
            dispatch({
                type:SET_ERRORS,
                payload:err.response.data
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

// Delete Scream
export const deleteScream = (screamId) =>(disptach)=>{
    axios.delete(`/scream/${screamId}`)
    .then(() =>{
        disptach({
            type:DELETE_SCREAM,
            payload:screamId
        })
    }).catch(err=>{
        console.log(err)
    })
}