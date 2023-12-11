import React from 'react'
import { takeEvery, call, put } from 'redux-saga/effects'
import Axios from 'axios'
import ActionTypes from '../actions/ActionsTypes'
// import {loginSuccess,loginFail} from '../actions/Actions'
import { getRequestMethod, putRequestMethod } from '../service/CommonService'
import UrlConstants from '../service/UrlConstants'
import { signInSuccess, signInFail } from '../actions/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage';



function* SignInitiate(action, navigation) {
     console.log('log in saga',action)
    let Apiresponse = ''
    Apiresponse = yield call(putRequestMethod, action.payload, UrlConstants.LOGIN)


    if (Apiresponse) {

        if (Apiresponse.status == 200) {
           yield AsyncStorage.setItem('jwtToken',JSON.stringify(Apiresponse.headers.sessionid))
           console.log('SignInApi',Apiresponse.status)
           yield put(signInSuccess(Apiresponse))
        }
        else {
            yield put(signInFail(Apiresponse))
            console.log('failed reducer called saga')

        }
    }
}

// function* getMyProfile(action,navigation) {
//      console.log('getmyprofile in saga',action)
//      let Apiresponse = ''
//      Apiresponse=yield call (getRequestMethod,action.payload,UrlConstants.LOGIN)
//     //  console.log('saga data', Apiresponse)

//     if(Apiresponse!=null)
//     {


//      if(Apiresponse.status==200)
//      {
//     yield put(loginSuccess(Apiresponse))
//     console.log('success reducer called saga')

//     }
//      else{
//          yield put(loginFail(Apiresponse))
//          console.log('failed reducer called saga')

//     }

//     }
// }


export default function* SignInSaga() {
    yield takeEvery(ActionTypes.SIGNIN_INITIATE, SignInitiate)
    // yield takeEvery(ActionTypes.GET_MY_PROFILE_INITIATE,getMyProfile)


}













