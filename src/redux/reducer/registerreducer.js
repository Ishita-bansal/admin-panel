import { ACTIONTYPE } from "../action/actiontype"

const defaultValues = {
    registerUser: []
}
const Registerreducer = (state=defaultValues , action)=>{
        switch(action.type){
            case ACTIONTYPE.REGISTER:
                return{
                    ...state,
                     registerUser:action.payload 
                };
                case ACTIONTYPE.REGISTERUPDATE:
                    return {
                       ...state,
                     registerUser:action.payload
                    }
        default: return state
        }
}
export default Registerreducer;