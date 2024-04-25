import { combineReducers } from "redux";
import  Registerreducer  from "./registerreducer";
import Loginreducer from "./loginreducer";
import Loaderreducer from "./loaderreducer";

const rootReducer = combineReducers({Registerreducer,Loginreducer,Loaderreducer})

export default rootReducer;