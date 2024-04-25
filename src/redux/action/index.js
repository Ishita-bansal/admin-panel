import { ACTIONTYPE } from "./actiontype";

export const register = (payload)=>{
    return{
      type:ACTIONTYPE.REGISTER,
      payload:payload
    }
}

export const login = (payload)=>{
   return{
    type:ACTIONTYPE.LOGIN,
    payload:payload
   }
}

export const logout = () =>{
  return{
    type:ACTIONTYPE.LOGOUT
  }
}

export const update = (payload)=>{
   return{
    type:ACTIONTYPE.UPDATE,
    payload:payload
   }
}

export const registerupdate = (payload)=>{
  return{
    type:ACTIONTYPE.REGISTERUPDATE,
    payload:payload
  }
}

export const loader = (payload)=>{
  console.log('payload==>',payload)
  return{
    type:ACTIONTYPE.LOADER,
    payload:payload
  }
}
