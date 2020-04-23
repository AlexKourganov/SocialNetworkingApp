import {SET_SCREAMS,LIKE_SCREAM,UNLIKE_SCREAM,LOADING_DATA, DELETE_SCREAM, POST_SCREAM,SET_SCREAM, SUBMIT_COMMENT} from '../types';
import { useImperativeHandle } from 'react';


const initialState = {
    screams:[],
    scream:{},
    loading:false
};

export default function (state=initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            };
        case SET_SCREAMS:
            return{
                ...state,
                screams:action.payload,
                loading:false
            }
        case SET_SCREAM:
            return{
                ...state,
                scream:action.payload
                
            }
        case LIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            // we get back updated information about the scream and new like count so we replace it in the state
            state.screams[index] = action.payload;
            
            if(state.scream.screamId === action.payload.screamId){
                // state.scream = action.payload;
                state.scream.likeCount = state.scream.likeCount + 1;
                
            }
            return{
                ...state
            } 
        case UNLIKE_SCREAM:    
            let index2 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            // we get back updated information about the scream and new like count so we replace it in the state
            state.screams[index2] = action.payload;
            
            if(state.scream.screamId === action.payload.screamId){
                // state.scream = action.payload;
                state.scream.likeCount = state.scream.likeCount - 1;
                
            }
            return{
                ...state
            }  
            
        case SUBMIT_COMMENT: 

        let updateCommentCount = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
        state.screams[updateCommentCount].commentCount = state.screams[updateCommentCount].commentCount + 1;
        return{
            ...state,
            scream:{
                ...state.scream,
                commentCount: state.scream.commentCount + 1,
                comments:[action.payload,...state.scream.comments]
            }
        }   
       
        case DELETE_SCREAM:
            let deleteIndex = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(deleteIndex,1);
            return{
                ...state
            };

        case  POST_SCREAM:
            
            return{
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            }    
       
        default:
            return state;      
    }
}