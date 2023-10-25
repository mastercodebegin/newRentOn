import React from 'react'
import { takeEvery, call, put } from 'redux-saga/effects'
import { getRequestMethodWithParam, putRequestMethod,postRequestMethod} from '../../context/service/CommonService'  

import AsyncStorage from '@react-native-async-storage/async-storage'
import  ActionsTypes  from "../../context/actions/ActionsTypes"
import { UrlConstants } from '../../context/service/UrlConstants'


let Apiresponse = {status:0,headers:{sessionid:''},data:[],}


// function* getAllProducts(pageNumber:any) {
//      console.log('---------------getProducts in saga', pageNumber)
//     //  console.log('saga data', Apiresponse)
//     let Apiresponse = {status:0,headers:{sessionid:''}}
//      Apiresponse=yield call (getRequestMethod,`api/users/${pageNumber?.payload}`)
//      console.log('getAllProducts---success reducer called saga',Apiresponse)

//     if(Apiresponse!=null)
//     {


//      if(Apiresponse.status==200)
//      {
//     yield put(getAllProductsSuccess(Apiresponse))

//     }
//      else{
//          yield put(getAllProductsFail(Apiresponse))
//          console.log('failed reducer called saga')

//     }

//     }
// }

// ${pageNumber?.payload}

function* getTopSoldProducts(data:any) {
    console.log('---------------getProductsss in saga', data)
   //  console.log('saga data', Apiresponse)
//    let Apiresponse = {status:0,headers:{sessionid:'',data:[]}}
//     Apiresponse=yield call (getRequestMethodWithParam,data,UrlConstants.GET_ALL_PRODUCTS)
//     console.log('getAllProducts---success reducer called saga',Apiresponse.data)

//    if(Apiresponse!=null)
//    {


//     if(Apiresponse.status==200)
//     {
//    yield put(getAllProductsSuccess(Apiresponse))

//    }
//     else{
//         yield put(getAllProductsFail(Apiresponse))
//         console.log('failed reducer called saga')

//    }}
}


export default function* DashboardSaga() {
    yield takeEvery(ActionsTypes.GET_TOP_SOLD_PRODUCTS_INITIATE,getTopSoldProducts)
}













