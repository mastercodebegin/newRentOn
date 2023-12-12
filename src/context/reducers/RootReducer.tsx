import {combineReducers} from 'redux'
import LoginReducer from '../../screen/login/LoginReducer'
 import ProfileReducer from './ProfileReducer'
 import DashBoardSlice from '../../screen/dashboard/DashBoardSlice'
import ProductsSlice from '../../screen/productList/ProductsSlice'
import AddressSlice from '../../screen/address/AddressSlice'
import orderSlice from '../../screen/orderDetails/OrderSlice'
 import ModalWindowsSlice from '../../utilits/ModalWindowsSlice'
 import SignInSlice from '../../screen/signin/SignInSlice'

const RootReducer = combineReducers({

    DashBoardSlice,
    ProductsSlice,
    AddressSlice,
    orderSlice,
    ModalWindowsSlice,
    SignInSlice
})


export default RootReducer


