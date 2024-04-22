import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
        },
        logout:(state)=>{
            state.currentUser = null
        }
    }
});

export const {signInSuccess,logout} = userSlice.actions;

export default userSlice.reducer;