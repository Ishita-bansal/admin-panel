import React from "react";
import "./adduser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { Errorhandle } from "../../components";
import { useSelector,useDispatch } from "react-redux";
import { register } from "../../redux/action";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import TOASTMESSAGE from "../../constants";
const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmpass: "",
  
};
const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Name must be of atleast 20 letters")
    .required("Required*"),
  email: yup
    .string()
    .matches(emailregex, "Email is not valid")
    .required("Required*"),
  password: yup
    .string()
    .min(4, "Password must be 4 character")
    .required("Required*"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("Required*"),

});

const Adduser = () => {
   const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state?.Registerreducer);
    const userdetail = userData?.registerUser || []
    // console.log("users data====>",userdetail);

  const onSubmit = (values) => {
   const addusers = userdetail?.some((users)=>{
       return users.email === values.email
   })
//  console.log("add users=========>",addusers);
   if(addusers){
      toast.error(TOASTMESSAGE.EXISTUSER);
  }  
  else{
       dispatch(register([...userdetail, values]));
       toast.success(TOASTMESSAGE.ADD);
       navigate('/tabledashboard')
       console.log("values===>",values);
   }
}

  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { values,setFieldValue,setTouched,touched,errors,handleSubmit} = formik;
  return (
    <>
      <h1>ADD NEW USER</h1>
      <form onSubmit={handleSubmit}>
        <div className="adduser-inputs">
          <div className="part1">
            <div className="adduser-input-fields">
              <FontAwesomeIcon icon={faUser} />
              <input
                name="name"
                type="text"
                value={values.name}
                onChange={(e)=>setFieldValue("name",e.target.value)}
                onBlur={()=>setTouched({...touched,name:true})}
                placeholder="Name"
              />
            </div>
            <div className="error-handle">
            <Errorhandle touched={touched} errors={errors} fieldName="name"/>
            </div>
        
            <div className="adduser-input-fields">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={(e)=>setFieldValue("email",e.target.value)}
                onBlur={()=>setTouched({...touched,email:true})}
                placeholder="Email"
              />
            </div>
            <div className="error-handle">
            <Errorhandle touched={touched} errors={errors} fieldName="email"/>
            </div>
          </div>
          <div className="part2">
            <div className="adduser-input-fields">
              <FontAwesomeIcon icon={faLock} />
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={(e)=>setFieldValue("password",e.target.value)}
                onBlur = {()=>setTouched({...touched,password:true})}
                placeholder="Password"
              />
            </div>
            <div className="error-handle">
            <Errorhandle touched={touched} errors={errors} fieldName="password"/>
            </div>
            
            <div className="adduser-input-fields">
              <FontAwesomeIcon icon={faLock} />
              <input
                name="password"
                type="password"
                value={values.confirmpass}
                onChange={(e)=>setFieldValue("confirmpass",e.target.value)}
                onBlur = {()=>setTouched({...touched,confirmpass:true})}
                placeholder="Confirm Password"
              />
            </div>
            <div className="error-handle">
            <Errorhandle touched={touched} errors={errors} fieldName="confirmpass"/>
            </div>
          </div>
        </div> 
        <div className="adduser-btn">
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default Adduser;
