//@ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequestMethod, getRequestMethodWithParam, postRequestMethod, putRequestMethodWithParam } from '../../context/service/CommonService';
import { UrlConstants } from '../../context/service/UrlConstants';






const ModalWindowsSlice = createSlice({
    name: 'ModalWindows',
    initialState: {
        showAddress:false

    },
   reducers:{
    showAddressModalwindow(state){
        state.showAddress = true
    },
    hideAddressModalwindow(state){
        state.showAddress = false
    }
   }
    
})

export default ModalWindowsSlice.reducer
export const {showAddressModalwindow,hideAddressModalwindow} = ModalWindowsSlice.actions
