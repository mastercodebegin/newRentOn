//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequestMethod, getRequestMethodWithParam } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';

//Action
export const getProducts = createAsyncThunk('getProducts', async (data) => {
    console.log('slice----', data);
    const response = await getRequestMethodWithParam(data, UrlConstants.GET_PRODUCTS)
    return response
})
export const getReqresUser = createAsyncThunk('getReqresUser', async () => {
    console.log('data 2----------------------');
    const response = await fetch('https://reqres.in/api/users/2').then(res => res.json(
    )).catch(err => console.log(err)
    )
    return response
})

export const getProductById = createAsyncThunk('getProductById', async (data) => {
    console.log('GET_PRODUCT_BY_ID slice----', data);
    const response = await getRequestMethodWithParam(data, UrlConstants.GET_PRODUCT_BY_ID)
    return response
})

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        isLoading: false,
        singleProductDetails: {},
        isSingleProduct: false
    },
    reducers: {
        makeProductFlagFalse:(state,action)=> {
            state.isSingleProduct = false
        },
        showAddressModalWindow: (state, action) => {
            state.addressListShow=true
            state.addressListHide=false
        },
    },
    extraReducers: {

        [getProducts.pending]: (state, action) => {
            console.log('pending------', action);
            state.isLoading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            console.log('fulfilled------', action);
            console.log('fulfilled data------', action.payload?.data?.responseDetails);
            state.isLoading = false
            state.data = action.payload?.data?.responseDetails
            state.isSingleProduct = true

        },
        [getProducts.rejected]: (state, action) => {
            console.log('rejected------', action);
            state.isLoading = false
        },



        [getProductById.pending]: (state, action) => {
            console.log('singleProductDetails pending------', action);
            state.isLoading = true
        },
        [getProductById.fulfilled]: (state, action) => {
            console.log('singleProductDetails fulfilled------', action);
            state.isLoading = false
            state.singleProductDetails = action.payload.data.responseDetails
            state.isSingleProduct=true
        },
        [getProductById.rejected]: (state, action) => {
            console.log('singleProductDetails rejected------', action);
            state.isLoading = true
        },



    },


})

export default ProductsSlice.reducer
export const {makeProductFlagFalse}=ProductsSlice.actions