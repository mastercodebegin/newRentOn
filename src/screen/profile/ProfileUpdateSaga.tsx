import React from 'react'
import { takeEvery, call, put } from 'redux-saga/effects'
import { getRequestMethod, putRequestMethod,postRequestMethod} from '../../context/service/CommonService'  

import AsyncStorage from '@react-native-async-storage/async-storage'
import  ActionsTypes  from "../../context/actions/ActionsTypes"
import { updateProfileFail, updateProfileInitiate , updateProfileSuccess } from './ProfileUpdateActions'
import { UrlConstants } from '../../context/service/UrlConstants'


let Apiresponse = {status:0,headers:{sessionid:''},data:[]}


function* updateProfile(profileDetails:any) {
     console.log('---------------update profile in saga', profileDetails)
     let obj = {
        "name": profileDetails?.payload?.mobile,
        "job": profileDetails?.payload?.countryCode
    }
    //  console.log('saga data', Apiresponse)
    let Apiresponse = {status:0,headers:{sessionid:''}}
     Apiresponse=yield call (putRequestMethod, obj,`api/users/1`)
     console.log('getAllProducts---success reducer called saga',Apiresponse)

    if(Apiresponse!=null)
    {


     if(Apiresponse.status==200)
     {
    yield put(updateProfileSuccess(Apiresponse))

    }
     else{
         yield put(updateProfileFail(Apiresponse))
         console.log('failed reducer called saga')

    }

    }
}


export default function* UpdateProfileSaga() {
    yield takeEvery(ActionsTypes.UPDATE_PROFILE_INITIATE,updateProfile)
}













