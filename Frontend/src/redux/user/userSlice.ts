import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:localStorage.getItem('user')?JSON.stringify(localStorage.getItem('user')):null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            localStorage.setItem('currentUser',JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.currentUser = null
        }
    }
});

export const {signInSuccess,logout} = userSlice.actions;

export default userSlice.reducer;   