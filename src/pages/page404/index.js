import React from 'react';
import {Button} from '@mui/material';
import "./page404.css"
import {useNavigate} from "react-router-dom";
import image1 from "../../assets/images/oops.jpg"
function Page404(){
    const navigate = useNavigate();
    return(
        <>
        <div className="notavailable">
            <img src={image1} alt="img" />
            <h1>404 PAGE NOT FOUND</h1>
            <Button variant="contained" onClick={()=>{navigate('/register')}}>Go To Register Page</Button>
        </div>
        </>
    )
}

export default Page404;