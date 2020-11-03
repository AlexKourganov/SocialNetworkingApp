import {SET_SCREAMS,LIKE_SCREAM,UNLIKE_SCREAM,LOADING_DATA, DELETE_SCREAM, POST_SCREAM,SET_SCREAM, SUBMIT_COMMENT,UPDATE_SLICE_DATA} from '../types';



const initialState = {
    screams:[],
    scream:{},
    loading:false,
    renderScreams:[],
    start:7,
    end:14
    
};

export default function (state=initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            };
        case SET_SCREAMS:
            // let tempScreams; 
            // if(state.renderScreams.length === 0){
            //     state.renderScreams = (action.payload).slice(0, 7);
            // }
        
            return{
                ...state,
                screams:action.payload,
                loading:false
            }
        case UPDATE_SLICE_DATA:
            
        
            return{
                ...state,
                renderScreams:action.payload,
                start:state.start+7,
                end:state.end+7
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
            
            
            // For PopUpWindow
            if(state.scream.screamId === action.payload.screamId){
                // state.scream = action.payload;
                console.log('main called')
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
            let deleteIndex2 = state.renderScreams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(deleteIndex,1);
            state.renderScreams.splice(deleteIndex2,1);
            return{
                ...state,
                start:state.start-1,
                end:state.end-1
            };

        case  POST_SCREAM:
            
            return{
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ],
                renderScreams:[action.payload,...state.renderScreams],
                start:state.start+1,
                end:state.end+1
            }    
       
        default:
            return state;      
    }
}