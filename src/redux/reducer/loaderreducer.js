import { ACTIONTYPE } from "../action/actiontype";


const defaultValues = {
    isLoader: false
}

const Loaderreducer = (state=defaultValues,action)=>{
    console.log("actions========>",action.type,action)
    switch(action.type){
        case ACTIONTYPE.LOADER :
            return{
                ...state,
               isLoader:action.payload.isLoader,
            }
            default: return state;
        };
       
}

export default Loaderreducer;