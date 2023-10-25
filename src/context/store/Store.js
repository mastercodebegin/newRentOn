// import RootReducer from './reducers/RootReducer';
import RootReducer from '../reducers/RootReducer'
import createSagaMiddleware from 'redux-saga'
import RootSaga from '../saga/RootSaga';
import {configureStore} from '@reduxjs/toolkit'
import DashBoardSlice from '../../screen/dashboard/DashBoardSlice';
import thunkMiddleware from 'redux-thunk';
import ProductsSlice from '../../screen/productList/ProductsSlice';
// import { createLogger } from "redux-logger";

// const logger = createLogger();



export default Store=configureStore({
    // reducer:DashBoardSlice 
    //reducer:{...RootReducer}
    devTools: true,
    reducer:RootReducer,
    middleware: [thunkMiddleware],


    
})
