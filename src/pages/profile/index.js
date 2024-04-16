import { Avatar } from "@mui/material";
import React from "react";
import "./profile.css"
import { useFormik } from "formik";
import { useSelector,useDispatch } from "react-redux";
import * as yup from "yup";
import { Errorhandle } from "../../components";
import { update } from "../../redux/action";
import { register } from "../../redux/action";
import { useNavigate } from "react-router-dom";
const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const validationSchema = yup.object().shape({
   name: yup
   .string()
   .max(20, "Name must be of atleast 20 characters")
   .required("Required*"),
 email: yup
   .string()
   .matches(emailregex, "Email is not valid")
   .required("Required*"),
 password: yup
   .string()
   .min(4, "Password must be 4 character")
   .required("Required*")
})
const Profile=()=>{
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const Registerusers = useSelector((state)=>state?.Registerreducer||[]);

const userlogdata = useSelector((state)=>state.Loginreducer);

const onSubmit = (values)=>{
    const filterusers =  Registerusers.registerUser?.filter((users)=>{
      return users.email !== userlogdata.email
    });
    console.log("filter users=====>",filterusers);
    filterusers?.push(values);
    dispatch(register(filterusers));
    dispatch(update(values));
    navigate('/tabledashboard');
   console.log(values);
}

const formik = useFormik({
   initialValues:{
      name:userlogdata.name,
      email:userlogdata.email ,
      password:userlogdata.password
   },
   onSubmit: onSubmit,
   validationSchema:validationSchema
})
const {handleSubmit,values,setFieldValue,setTouched ,touched,errors} = formik
     return(
        <>
           <div class="row" className="user-profile">
               <div class="col-lg-12" >
                   <h1 style={{marginTop:"20px"}}>Details</h1>
                   <form onSubmit={handleSubmit}>
                      <div className="profile-inputs">
                        <div className="profile-input-fields">
                           <input name="name" value={values.name} onChange={(e)=>setFieldValue("name",e.target.value)} onBlur={()=>setTouched({...touched,name:true})} type="text" placeholder="Name" />
                           <Errorhandle touched={touched} errors={errors} fieldName="name"/>
                        </div>
                        <div className="profile-input-fields">
                           <input name="email" value={values.email} onChange={(e)=>setFieldValue("email",e.target.value)} onBlur={()=>setTouched({...touched,email:true})} type="email" placeholder="email" />
                           <Errorhandle touched={touched} errors={errors} fieldName="email"/>
                        </div>
                        <div className="profile-input-fields">
                           <input name="password" value={values.password} onChange={(e)=>setFieldValue("password",e.target.value)} onBlur={()=>setTouched({...touched,password:true})} type="password" placeholder="password" />
                           <Errorhandle touched={touched} errors={errors} fieldName="password"/>
                        </div>
                        </div>
                        <div className="profile-btn">
                           <button type="submit">Update Button</button>
                        </div>
                   </form>
               </div>
           </div>
        </>
     )
}

export default Profile;