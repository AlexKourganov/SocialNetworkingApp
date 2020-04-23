import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM, LOADING_UI,DELETE_SCREAM, SET_ERRORS, CLEAR_ERRORS,POST_SCREAM,SET_SCREAM,STOP_LOADING_UI,SUBMIT_COMMENT} from '../types';
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
// Submit a comment
export const submitComment = (screamId,commentData) =>(dispatch)=>{

    axios.post(`/scream/${screamId}/comment`,commentData)
    .then(res=>{
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        });
        
        dispatch(clearErrors());
    }).catch(err =>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

// Get ONE Scream data
export const getScream = (screamId) =>(dispatch)=>{
    dispatch({type:LOADING_UI});

    axios.get(`/scream/${screamId}`)
    .then(res=>{
        dispatch({
            type:SET_SCREAM,
            payload:res.data
        });
        dispatch({type:STOP_LOADING_UI});
    })
    .catch(err=>{
        console.log(err);
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

export const getUserData = (userHandle) =>(dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res =>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data.screams
        });
    })
    .catch(err => {
        dispatch({
            type:SET_SCREAMS,
            payload:null
        })
    })
}

// Clear Errors

export const clearErrors =()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}