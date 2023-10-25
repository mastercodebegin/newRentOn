import  ActionsTypes  from "../../context/actions/ActionsTypes"

export const getTopSoldProductsInitiate=(data:any)=>{
    return{
        type:ActionsTypes.GET_TOP_SOLD_PRODUCTS_INITIATE,
        payload:data
    }
    
}
export const getTopSoldProductsSuccess=(data:any)=>{
    return{
        type:ActionsTypes.GET_TOP_SOLD_PRODUCTS_SUCCESS,
        payload:data
    }
    
}
export const getTopSoldProductsFail=(data:any)=>{
    return{
        type:ActionsTypes.GET_TOP_SOLD_PRODUCTS_FAIL,
        payload:data
    }    
}

export const emptyTopSoldProductsState=()=>{
    return{
        type:ActionsTypes.EMPTY_TOP_SOLD_PRODUCTS_STATE,
        
    }    
}