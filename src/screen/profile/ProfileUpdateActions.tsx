import ActionsTypes  from "../../context/actions/ActionsTypes"

export const updateProfileInitiate=(data:any)=>{
    return{
        type:ActionsTypes.UPDATE_PROFILE_INITIATE,
        payload:data
    }
    
}
export const updateProfileSuccess=(data:any)=>{
    return{
        type:ActionsTypes.UPDATE_PROFILE_SUCCESS,
        payload:data
    }
    
}
export const updateProfileFail=(data:any)=>{
    return{
        type:ActionsTypes.UPDATE_PROFILE_FAIL,
        payload:data
    }    
}

export const emptyUpdateProfileState=()=>{
    return{
        type:ActionsTypes.EMPTY_PROFILE_STATE,
        
    }    
}