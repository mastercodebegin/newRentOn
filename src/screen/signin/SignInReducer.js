import ActionsTypes from "../../context/actions/ActionsTypes";

const initialState=[1];
export default SignInReducer=(state=initialState,action)=>{
    console.log('SignInReducer',action.type)
    switch(action.type)
    {
         case ActionsTypes.SIGNIN_INITIATE_INITIATE: return {isLoading:true}
         case ActionsTypes.SIGNIN_SUCCESS:return{...state,status:action.status,isLoading:false,data:action.payload}
         case ActionsTypes.SIGNIN_FAIL:return{...state,isLoading:false,data:action.payload}
        
         default : return state

    }

}
