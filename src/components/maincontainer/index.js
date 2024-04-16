import React from "react";
import Navbar from "../navbar";
import Sidenav from "../sidenav";
import "./main.css";

const Maincontainer = ({elements}) =>{
    return(
        <>
             <div style={{ position: "relative" }}>
                <Sidenav/>
                <div className="display-data">
                    {elements}
                </div>  
                <Navbar/>  
           </div>
        </>
    )
}

export default Maincontainer;