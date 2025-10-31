import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        setAuthUser:(state, action)=>{
            state.user = action.payload
        },
        setSuggestedUser:(state, action)=>{
            state.suggestedUsers=action.payload
        },
        setuserProfile:(state,action)=>{
            state.userProfile =action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser =action.payload;
        }
    }
})

export const {setAuthUser,setSuggestedUser, setuserProfile,setSelectedUser} = authSlice.actions;
export default  authSlice.reducer;