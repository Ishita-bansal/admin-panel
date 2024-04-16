import { combineReducers } from "redux";
import  Registerreducer  from "./registerreducer";
import Loginreducer from "./loginreducer";

const rootReducer = combineReducers({Registerreducer,Loginreducer})

export default rootReducer;