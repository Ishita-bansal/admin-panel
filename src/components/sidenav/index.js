import React,{useState} from "react";
import { faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faDashboard ,faTable ,faDiamond} from  "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import "./sidenav.css";
const Sidenav = () => {

    const [sidenavopen , setsidenavopen] = useState(false);

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
          <Avatar sx={{width:"90px" ,height:"90px"}}></Avatar>
           <h2 style={{color:"white",marginTop:"20px"}}>User</h2>
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
              <p>Blog</p>
            </div>
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
              <p>News</p>
            </div>
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
              <p>Category</p>
            </div>
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
              <p>Product</p>
            </div>
            <div className="sub-inputs">
                <FontAwesomeIcon icon={faDiamond} className="font-icon"/>
              <p>Order</p>
            </div>
          </div>
        </div>
    </>
  );
};

export default Sidenav;
