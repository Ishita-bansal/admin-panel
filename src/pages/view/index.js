import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const View = ()=>{

    const userRegistered = useSelector((state)=>state.Registerreducer);
    const data = userRegistered.registerUser || [];
    console.log("data========>",data);
    const { email } = useParams();
 console.log(email);
    const currentuserdata = data?.find((users)=> users.email === email)
    console.log("currentuserdata======>",currentuserdata);
      return(
        <>
        <h1>User Data</h1>
        <div style={{borderRadius:"30px",margin:"40px",backgroundColor:"#f2f2f2",padding:"60px",width:"50%",height:"50vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",gap:"20px"}}>

            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Name:</h3>
                <p>{currentuserdata.name}</p>
            </div>
            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Email:</h3>
                <p>{currentuserdata.email}</p>
            </div>
            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Password:</h3>
                <p>{currentuserdata.password}</p>
            </div>
            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Confirm Password:</h3>
                <p>{currentuserdata.confirmpass}</p>
            </div>
        </div>
        </>
      )
}

export default View;