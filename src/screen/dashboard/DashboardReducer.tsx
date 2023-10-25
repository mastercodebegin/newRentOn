import ActionsTypes  from "../../context/actions/ActionsTypes"

const initialState:[]=[]
const DashboardReducer=(state=initialState,action:any)=>{
 console.log('Dashboard reducer------',action);
    
    switch(action.type)
    {

        case ActionsTypes.GET_TOP_SOLD_PRODUCTS_INITIATE:
        return{isLoading:true,type:action.type,data:action.payload}

        case ActionsTypes.GET_TOP_SOLD_PRODUCTS_SUCCESS:
        return {...state,data:action.payload,isLoading:false,type:action.type,status:200};

        case ActionsTypes.GET_TOP_SOLD_PRODUCTS_FAIL:
        return {...state,data:action.payload,isLoading:false,type:action.type,status:201};

        case ActionsTypes.EMPTY_PRODUCTS_STATE:
        return initialState;

        default:
        return state
    }

}

export default DashboardReducer