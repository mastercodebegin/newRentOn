//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequestMethod, getRequestMethodWithParam, postRequestMethod, putRequestMethodWithParam } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';

//Action
export const createOrder = createAsyncThunk('createOrder', async (data) => {
    console.log('slice----', data);
    const response = await putRequestMethodWithParam(data, UrlConstants.CREATE_ORDER)
    console.log('resp-----  ', response);
    return response
})
export const updateOrder = createAsyncThunk('updateOrder', async () => {
    //console.log('data 2----------------------');
    const response = await postRequestMethod(data, UrlConstants.UPDATE_ORDER)

    console.log('update order---', response);
    return response
})

export const buyOrderWithCOD = createAsyncThunk('buyOrderWithCOD', async (data) => {
    //console.log('data 2----------------------');
    const response = await postRequestMethod(data, UrlConstants.BUY_ORDER_WITH_COD)

    console.log('update order---', response);
    return response
})
export const getAllOrder = createAsyncThunk('getAllOrder', async () => {
    //console.log('data 2----------------------');
    const response = await getRequestMethod(UrlConstants.GET_ALL_ORDER_BY_USER_ID)

    console.log('update order---',response);
    return response
})

const orderSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        isLoading: false,
        isRetry: false,
        isCOD: false,
        isUpdated:false,
        isPaymentDone: false,
        isRejected: false,
        showAddress: false,
        isShowAddressModalWindowOpen: false,
        allOrder:[],
        order:{},
    },
    extraReducers: {

        [createOrder.pending]: (state, action) => {
            console.log('pending------', action);
            state.isLoading = true
        },
        [createOrder.fulfilled]: (state, action) => {
            console.log('fulfilled------', action);
            console.log('fulfilled createOrder------', action.payload);

            state.isLoading = true
            state.order = action.payload

        },
        [createOrder.rejected]: (state, action) => {
            console.log('rejected------', action);
            //state.isLoading = true
        },


        [updateOrder.pending]: (state, action) => {
            console.log('updateOrder pending------', action);
            state.isLoading = true
            state.isPaymentDone=true


        },
        [updateOrder.fulfilled]: (state, action) => {
            console.log('updateOrder fulfilled------', action);
            state.isLoading = false
            state.isUpdated=true
            state.showAddress=false
            state.isShowAddressModalWindowOpen=false
        },
        [updateOrder.rejected]: (state, action) => {
            console.log('updateOrder rejected------', action);
            state.isLoading = false,
            state.updateOrderIsRejected=true
            state.showAddress=false


        },

        [buyOrderWithCOD.pending]: (state, action) => {
            console.log('buyOrderWithCOD pending------', action);
            state.isLoading = true

        },
        [buyOrderWithCOD.fulfilled]: (state, action) => {
            console.log('buyOrderWithCOD fulfilled------', action);
            state.isLoading = false
            state.isCOD=true
        },
        [buyOrderWithCOD.rejected]: (state, action) => {
            console.log('buyOrderWithCOD rejected------', action);
            state.isLoading = false
        },
        
        
        
        [getAllOrder.pending]: (state, action) => {
            console.log('getAllOrder pending------', action);
            state.isLoading = true
        },
        [getAllOrder.fulfilled]: (state, action) => {
            console.log('getAllOrder fulfilled------', action);
            state.isLoading = true
            state.allOrder = action.payload
        },
        [getAllOrder.rejected]: (state, action) => {
            console.log('getAllOrder rejected------', action);
            state.isLoading = true
        },

    },
    reducers: {

        clearOrderState(state, action) {
            console.log('updateOrderClearState pending------',);
                state.isLoading = false,
                state.isRetry = true
        },

     
    }



})
console.log(orderSlice.actions);

export default orderSlice.reducer
export const { clearOrderState } = orderSlice.actions