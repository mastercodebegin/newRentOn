//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequestMethod, getRequestMethodWithParam } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';

//Action
export const getTopSoldProducts = createAsyncThunk('getTopSoldProducts', async (data) => {
    console.log('slice----',data);
    const response = await getRequestMethod('https://reqres.in/api/users/2')
    console.log('dashboard-----  ',response);
    return response
})

export const getUser = createAsyncThunk('getUser', async () => {
    console.log('data 2----------------------');
    const response = fetch('').then(res=>res.json().then(res=>console.log('error----',res)
    )).catch(err=>console.log(err)
    )
    console.log(response.status);
    return response
})

export const searchProduct = createAsyncThunk('searchProduct', async (data) => {
    console.log('slice----',data);
    const response = await getRequestMethodWithParam(data,UrlConstants.SEARCH_PRODUCTS)
    console.log('dashboard-----  ',response);
    return response
})

const DashBoardSlice = createSlice({
    name: 'dashBoard',
    initialState: {
        data: [],
        searchData:[],
        isLoading: false
    },
    extraReducers: {

        [getTopSoldProducts.pending]: (state, action) => {
            console.log('pending------', action);
            state.isLoading = true
        },
        [getTopSoldProducts.fulfilled]: (state, action) => {
            console.log('fulfilled------', action.payload.data);
            state.isLoading = true
            state.data = action.payload.data

        },
        [getTopSoldProducts.rejected]: (state, action) => {
            console.log('rejected------', action);
            state.isLoading = true
        },



        [getUser.pending]: (state, action) => {
            console.log('getUser pending------', action);
            state.isLoading = true
        },
        [getUser.fulfilled]: (state, action) => {
            console.log('getUser fulfilled------', action);
            state.isLoading = true
        },
        [getUser.rejected]: (state, action) => {
            console.log('getUser rejected------', action);
            state.isLoading = true
        },


        [searchProduct.pending]: (state, action) => {
            console.log('searchProduct pending------', action);
            state.isLoading = true
        },
        [searchProduct.fulfilled]: (state, action) => {
            console.log('searchProduct fulfilled------', action?.payload?.data?.responseDetails);
            state.searchData=action?.payload?.data?.responseDetails
            state.isLoading = false
        },
        [searchProduct.rejected]: (state, action) => {
            console.log('searchProduct rejected------', action);
            state.isLoading = false
        },



    },


})

export default DashBoardSlice.reducer