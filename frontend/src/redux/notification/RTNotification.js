import { createSlice } from "@reduxjs/toolkit";

const RTNotification=createSlice({
    name:"RTNotification",
    initialState:{
        likeNotification:[],
    },
    reducers:{
        setLikeNotification:(state, action)=>{
            
            if(action.payload.type==="like"){
                state.likeNotification.push(action.payload);
            }else if(action.payload.type==="dislike"){
                state.likeNotification =state.likeNotification.filter((item)=>item._id!==action.payload.userId);
            }
        }
    }
})

export const {setLikeNotification} = RTNotification.actions;
export default RTNotification.reducer;