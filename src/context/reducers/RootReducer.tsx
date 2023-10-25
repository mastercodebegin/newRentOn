import {combineReducers} from 'redux'
import LoginReducer from '../../screen/login/LoginReducer'
 import ProfileReducer from './ProfileReducer'
 import DashBoardSlice from '../../screen/dashboard/DashBoardSlice'
import ProductsSlice from '../../screen/productList/ProductsSlice'
import AddressSlice from '../../screen/address/AddressSlice'
import orderSlice from '../../screen/orderDetails/OrderSlice'
 import ModalWindowsSlice from '../../utilits/ModalWindowsSlice'

const RootReducer = ({

    DashBoardSlice,
    ProductsSlice,
    AddressSlice,
    orderSlice,
    ModalWindowsSlice
})


export default RootReducer


