import  ActionsTypes  from "../../context/actions/ActionsTypes"

const initialState={}
const UpdateProfileReducer=(state=initialState,action:any)=>{
    // console.log('add brand reducer------',action);
    
    switch(action.type)
    {

        case ActionsTypes.UPDATE_PROFILE_INITIATE:
        return{isLoading:true,type:action.type}


        case ActionsTypes.UPDATE_PROFILE_SUCCESS:
        return {...state,data:action.payload,isLoading:false,type:action.type,status:200};

        case ActionsTypes.UPDATE_PROFILE_FAIL:
        return {...state,data:action.payload,isLoading:false,type:action.type,status:201};

        case ActionsTypes.EMPTY_PROFILE_STATE:
        return initialState;

        default:
        return state
    }

}

export default UpdateProfileReducer