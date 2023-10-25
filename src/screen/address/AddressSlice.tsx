//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequestMethod, getRequestMethodWithParam, postRequestMethod, putRequestMethodWithParam } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';

//Action
export const createAddress = createAsyncThunk('createAddress', async (data) => {
    console.log('slice----', data);
    const response = await postRequestMethod(data, UrlConstants.CREATE_ADDRESS)
    console.log('resp-----  ', response);
    return response
})
export const getAllAddress = createAsyncThunk('getAllAddress', async () => {
    console.log('data 2----------------------');
    const response = await getRequestMethod(UrlConstants.GET_ALL_ADDRESS)

    console.log('response', response);
    return response
})

export const markAddressPrimary = createAsyncThunk('markAddressPrimary', async (data) => {
    console.log('markAddressPrimary----------------------', data);
    // const data1={'addressId':31}
    const response = await putRequestMethodWithParam(data, UrlConstants.MARK_ADDRESS_AS_PRIMARY)
    console.log('markAddressPrimary response', response);
    return response
})

export const updateAddress = createAsyncThunk('updateAddress', async (data) => {
    console.log('markAddressPrimary----------------------', data);
    // const data1={'addressId':31}
    const response = await postRequestMethod(data, UrlConstants.UPDATE_ADDRESS)
    console.log('markAddressPrimary response', response);
    return response
})

export const deleteAddress = createAsyncThunk('deleteAddress', async (data) => {
    console.log('deleteAddress----------------------', data);
    const response = await putRequestMethodWithParam(data, UrlConstants.DELETE_ADDRESS)
    console.log('deleteAddress response', response);
    return response
    // const data1={'addressId':31}
    // try{

    //     const response = await putRequestMethodWithParam(data, UrlConstants.DELETE_ADDRESS)
    //     console.log('deleteAddress response', response);
    //     return response
    // }
    // catch (err) {
    //     console.log('catch----------------------', err);
        
    //     // if (!err.response) {
    //       throw err
    //     // }
    // }
})




const AddressSlice = createSlice({
    name: 'adressSlice',
    initialState: {
        data: [],
        isLoading: false,
        type: '',
        isHideModal: false,
        addressListShow:false,
        addressListHide:true,
        addressAddedORUpdate:false,
        message:''
    },
    reducers:{
        showAddressModalWindow: (state, action) => {
            state.addressListShow=true
            state.addressListHide=false
        },
        hideAddressModalWindow: (state, action) => {
            state.addressAddedORUpdate=false
               }
    },
    extraReducers: {

        [deleteAddress.pending]: (state, action) => {
            console.log('deleteAddress pending------', action);
            state.isLoading = true
            state.type = action.type
        },
        [deleteAddress.fulfilled]: (state, action) => {
            console.log('deleteAddress fulfilled------', action.payload);
            state.isLoading = false
            state.data = action.payload
            state.type = action.type
            state.addressListShow=false
            state.addressListHide=true
            state.addressAddedORUpdate=true
            state.message='Address deleted successfully'
            
        },
        [deleteAddress.rejected]: (state, action,) => {
            console.log('deleteAddress rejected------',state.error );
            state.isLoading = false
            state.type = action.type
        },

        [createAddress.pending]: (state, action) => {
            console.log('createAddress pending------', action);
            state.isLoading = true
            state.type = action.type
            state.isHideModal = false
            state.addressListShow=false
            state.addressListHide=true

        },
        [createAddress.fulfilled]: (state, action) => {
            console.log('fulfilled------', action.payload);
            console.log('createAddress fulfilled data------', action.payload?.data?.responseDetails);
            state.isLoading = false
            state.data = state.data.concat(action.payload)
            state.type = action.type
            state.isHideModal = true
            state.addressAddedORUpdate=true
            state.message = 'Address created successfully'

        },
        [createAddress.rejected]: (state, action) => {
            console.log('createAddress rejected------', action);
            state.isLoading = true
            state.type = action.type,
            state.isHideModal = true

        },


        [getAllAddress.pending]: (state, action) => {
            console.log('getAllAddress pending------', action);
            state.isLoading = true
            state.message=''

        },
        [getAllAddress.fulfilled]: (state, action) => {
            console.log('getAllAddress fulfilled------', action);
            state.isLoading = false
            state.data = action.payload
            state.type = action.type
             state.addressAddedORUpdate=false
            state.message=''
            


        },
        [getAllAddress.rejected]: (state, action) => {
            console.log('getAllAddress rejected------', action);
            state.isLoading = false
            state.type = action.type
            state.message=''


        },


        [markAddressPrimary.pending]: (state, action) => {
            console.log('getAllAddress pending------', action);
            state.isLoading = true
            state.type = action.type
        },
        [markAddressPrimary.fulfilled]: (state, action) => {
            console.log('markaddress fulfilled------', action.payload);
            state.isLoading = false
            state.data = action.payload
            state.type = action.type
            state.addressAddedORUpdate=true
            state.addressListShow=false
            state.addressListHide=true
            state.message='Delivery address updated successfully'

        },
        [markAddressPrimary.rejected]: (state, action) => {
            console.log('markaddress rejected------', action);
            state.isLoading = false
            state.type = action.type

        },



        [updateAddress.pending]: (state, action) => {
            console.log('updateAddress pending------', action);
            state.isLoading = true
            state.type = action.type
        },
        [updateAddress.fulfilled]: (state, action) => {
            console.log('updateAddress fulfilled------', action.payload);
            state.isLoading = false
            state.data = action.payload
            state.type = action.type
            state.isHideModal = true
            state.addressAddedORUpdate=false
            state.addressListShow=false
            state.addressListHide=true
            state.message='Address updated successfully'
        },
        [updateAddress.rejected]: (state, action) => {
            console.log('updateAddress rejected------', action);
            state.isLoading = false
            state.type = action.type

        },


    },
    
    
})

export default AddressSlice.reducer
export const {showAddressModalWindow,hideAddressModalWindow} = AddressSlice.actions