//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { putRequestMethod } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';


export const getSignInInitiate = createAsyncThunk('getSignInInitiate',async (data) => {
    console.log('SignIn Slice----',data);
    const response = await putRequestMethod(data,'https://reqres.in/api/users/2')
    console.log('SignIn Slice response----',response)
    return response
})

const SignInSlice = createSlice({
    name : 'signInslice',
    initialState:{
        isLoading: false,
    },
    

    extraReducers: {

        [getSignInInitiate.pending]: (state, action) => {
            console.log('pending------', action);
            state.isLoading = true
        },
        [getSignInInitiate.fulfilled]: (state, action) => {
            console.log('fulfilled------', action?.payload);
            state.isLoading = false
            state.data = action.payload

        },
        [getSignInInitiate.rejected]: (state, action) => {
            console.log('rejected------', action);
            state.isLoading = false
        },

    },


})
// export const { reducer: signInReducer } = signInSlice;

export default SignInSlice.reducer

