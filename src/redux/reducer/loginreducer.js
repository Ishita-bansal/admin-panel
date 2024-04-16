import { ACTIONTYPE } from "../action/actiontype";

const defaultValues = {
    name:"",
    email:"",
    password:"",
    isLoggedIn:false
}
const Loginreducer = (state=defaultValues , action)=>{
     switch(action.type){
        case ACTIONTYPE.LOGIN :
            return{
               ...state,
               name:action.payload.name,
               email:action.payload.email,
               password:action.payload.password,
               isLoggedIn:true,
            }
            case ACTIONTYPE.LOGOUT:
              return{
                    ...state,
                    name:"",
                    email:"",
                    password:"",
                    isLoggedIn:false
                }
             case ACTIONTYPE.UPDATE:
                return{
                    ...state,
                    name:action.payload.name,
                    email:action.payload.email,
                    password:action.payload.password,
                    isLoggedIn:true
                }
            default: return state; 
     }
        
}

export default Loginreducer;