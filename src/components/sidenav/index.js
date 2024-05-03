import React,{useState} from "react";
import { faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faDashboard ,faTable ,faDiamond} from  "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import "./sidenav.css";
import { useSelector } from "react-redux";
const Sidenav = () => {

    const [sidenavopen , setsidenavopen] = useState(false);
    const userDetail = useSelector((state) => state?.Loginreducer);

    const handlesidenavOpen = () =>{
        setsidenavopen(true);
    }

    const handlesidenavClose = () =>{
        setsidenavopen(false);
    }

  return (
    <>   
       <div className="sidenav">
         {
         !sidenavopen ?   <button className="dash-btn" onMouseEnter={ handlesidenavOpen}>
            <FontAwesomeIcon icon={faBars} className="right-font-icon"/>
          </button>  : <button className="dash-btn" onMouseLeave={handlesidenavClose}>
            <FontAwesomeIcon icon={faTimes} className="less-font-icon"/>
          </button>  
         }
          <div className="avatar">
          <Avatar sx={{width:"90px" ,height:"90px",fontSize:"25px"}}>{userDetail?.name[0]}</Avatar>
           <h2 style={{color:"white",marginTop:"20px"}}>{userDetail?.name}</h2>
          </div>
          <div className="inputs">
         
          <div className="sub-inputs">
            <FontAwesomeIcon icon={faDashboard}  className="font-icon"/>
            <Link to="/dashboard" className="table-link">
            <p>Dashboard</p>
            </Link>
            </div>
            <div className="sub-inputs" >
            <FontAwesomeIcon icon={faTable} className="font-icon"/>
              <Link to="/tabledashboard" className="table-link">
                <p>User Details</p>
              </Link>
            </div>
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
                <Link to="/blogdetail" className="table-link">
                <p>Blog</p>
                </Link>
            </div>
            {/* <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
                <Link to="/category" className="table-link"> 
              <p>Category</p>
            </Link>
            </div> */}
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
                <Link to="/productlist" className="table-link"> 
              <p>Customers Enquiry</p>
              </Link>
            </div>
            {/* <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
                <Link to="/order" className="table-link">
              <p>Order</p>
              </Link>
            </div> */}
          </div>
        </div>
    </>
  );
};

export default Sidenav;
