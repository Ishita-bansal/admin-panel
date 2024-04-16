import React from "react";
function Errorhandle({touched,errors,fieldName}){
    return(
        <>
        {
        touched?.[fieldName] && errors?.[fieldName] ? (
                  <p style={{color:"red",fontStyle:"italic",textAlign:"start"}}>{errors?.[fieldName]}</p>
                ) : (
                  <p style={{ visibility: "hidden" }}>Text</p>
                )
          }
        </>
    )
}

export default Errorhandle;