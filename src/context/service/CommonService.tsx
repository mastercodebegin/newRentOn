
import React from 'react'
import Axios from 'axios'
import {UrlConstants} from './UrlConstants'
import { Header } from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const getRequestMethod = async (requestUrl:any) => {
     console.log('get method Service url', UrlConstants.BASE_URL + requestUrl)
    
    const response = await Axios({
        method: 'GET',
        url: UrlConstants.BASE_URL + requestUrl,
        headers:{
             "jwtToken": UrlConstants.TOKEN
            // 'Content-Type': 'application/json',
         },
         
        
        // url: UrlConstants.BASE_URL+ requestUrl,
       }        
    ).catch(error=>error);
    console.log('get method----GET',response);

    return response.data
}

export const getRequestMethodWithParam = async (requestData: any ,requestUrl:any) => {
    console.log('get method with param Service  url----', UrlConstants.BASE_URL + requestUrl)
    console.log('get method Service requestData-----', requestData)
   
   const response = await Axios({
       method: 'GET',
       url: UrlConstants.BASE_URL + requestUrl,
       headers:{
            "jwtToken": UrlConstants.TOKEN,
           
        },
        params:requestData
          }        
   ).catch(error=>error);
   console.log('get method error----',response.data.responseDetails);

   return response
}


export const postRequestMethod = async (requestData:any, requestUrl:any) => {
    console.log('post url-----------',UrlConstants.BASE_URL+requestUrl);
    const  response = await Axios({
        method:'post',
        data:requestData,
        url:UrlConstants.BASE_URL+requestUrl,  
        headers:{'jwtToken':UrlConstants.TOKEN}
        
    }).catch(error=>console.log('error--------------',error)
    );
    console.log('post url after response-----------',UrlConstants.BASE_URL+requestUrl);
    
    return response?.data
    


}
export const putRequestMethod = async (requestData:any, requestUrl:any) => {
    console.log(requestData,"Put method")
    const  response = await Axios({
        method:'put',
        data:requestData,
        url:UrlConstants.BASE_URL+requestUrl,  
        
    }).catch(error=>error.response.status!==200?error.response.data:null);
    console.log('url-----------',UrlConstants.BASE_URL+requestUrl);
    
    return response?.data
    
}

export const putRequestMethodWithParam = async (requestData:any, requestUrl:any) => {
    console.log(requestData,"Put method-----",requestData)
    const  response = await Axios({
        method:'put',
        params:requestData,
        url:UrlConstants.BASE_URL+requestUrl,  
        
    }).catch(error=>error.response.status!==200?error.response.data:null);
    console.log('url-----------',);
    
    return response.data
    
}