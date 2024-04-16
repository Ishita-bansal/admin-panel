import React, { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {useFormik} from "formik";
import * as yup from "yup";
import image1 from "../../assets/images/loginpage.png";
import { Errorhandle } from "../../components";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../../redux/action";
import TOASTMESSAGE from "../../constants";
import {toast} from "react-toastify"
import { useNavigate,Link } from "react-router-dom";
const defaultValues = {
  email: "",
  password: "",
};
const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const validationSchema = yup.object().shape({
   email: yup
     .string()
     .matches(emailregex, "Email is not valid")
     .required("Required*"),
   password: yup
     .string()
     .min(4, "Password must be 4 character")
     .required("Required*")
 });

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const togglepassword = () => {
    setshowPassword(!showPassword);
  };

   const allusers = useSelector((state)=>state?.Registerreducer||[]);
 
  const onSubmit = (values) =>{
   
     let loginusers = allusers.registerUser?.find((users)=>{
       return users.email === values.email && users.password === values.password;
     })
   

    if(loginusers === undefined){
      toast.error(TOASTMESSAGE.LOGINCHECK)
    }
    else{
      dispatch(login(loginusers));
      navigate('/dashboard');
      toast.success(TOASTMESSAGE.LOGIN);
    }
  }
 
  const formik = useFormik({
     initialValues:defaultValues,
     onSubmit:onSubmit,
     validationSchema:validationSchema
  })
 
const {setFieldValue ,values,setTouched,touched,errors,handleSubmit} = formik;

  return (
    <>
      <div className="login-container">
        <div className="sub-login-container">
          <div className="row">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="login-box">
                  <h4>Welcome back !!!</h4>
                  <h1>Log In</h1>
                  <div className="login-inputs">
                    <div className="login-input-field">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="login-fonticon"
                      />
                      <input
                        type="email"
                        name="email" 
                        value={values.email}
                        onChange={(e)=>setFieldValue("email",e.target.value)}
                        onBlur={()=>setTouched({...touched,email:true})}
                        placeholder="Email" />
                    </div>
                    <Errorhandle touched={touched} errors={errors} fieldName="email"/>
                    <div className="login-input-field">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="login-fonticon"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                       value={values.password}
                       onChange={(e)=>setFieldValue("password",e.target.value)}
                       onBlur={()=>setTouched({...touched,password:true})}
                        placeholder="Password"
                      />
                       
                      <button
                        type="button"
                        onClick={togglepassword}
                        className="logineyebtn">
                        
                        {showPassword ? (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="login-eyeicon"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="login-eyeicon"
                          />
                        )}
                      </button>
                    </div>
                    <Errorhandle touched={touched} errors={errors} fieldName="password"/>
                  </div>
                  <div className="login-btn">
                    <button type="submit">Login</button>
                  </div>
                  <div className="register-first">
                    <h5>Do you have registered yet?</h5>
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="login-part2">
                <div className="sub-login-part2">
                  <img src={image1} alt="pic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
