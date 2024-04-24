import React from "react";
import Spinner from "react-spinner-material";
const Loader= () =>{
    return(
        <div style={{textAlign:"center",display:"flex",justifyContent:"space-around",flexDirection:"column",alignItems:"center",marginTop:"15%",Zindex:"999"}}>
              <div>
               <Spinner radius={80} color={"blue"} stroke={2} visible={true}></Spinner>
               <h4>Loading......</h4>
              </div>
        </div>
    )
}
export default Loader;