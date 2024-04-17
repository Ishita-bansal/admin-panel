import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import React from "react";
import {Register,Login,Dashboard,Profile,Tabledashboard,Page404, Adduser, Edituser,Uipage, Formsformik,View} from "../pages"
import { useSelector } from "react-redux";
import Maincontainer from "../components/maincontainer";

function Router(){
 const logedUser = useSelector((state)=>state.Loginreducer);
 
   const PrivateRouter = ({element})=>{ 
      return  logedUser?.isLoggedIn ? <> <Maincontainer  elements={element}/> </> : Navigate('/login');
   }

   const PublicRouter = ({element})=>{
     return !logedUser?.isLoggedIn ? element : Navigate('/dashboard');
   }
    return (
        <>
          <BrowserRouter>
            <Routes>
                <Route path="/register" element={<PublicRouter element={<Register/>} />}/>
                <Route path="/login" element = {<PublicRouter element={<Login/>} />} />
                <Route path="/dashboard" element= {<PrivateRouter  element={<Dashboard/>} />}/>
                <Route path="/profile" element={<PrivateRouter element={<Profile/>} />}  />
                <Route path="/tabledashboard" element={<PrivateRouter element={<Tabledashboard/>}/>}/>
                <Route path="/adduser" element = {<PrivateRouter element={<Adduser/>} /> } />
                <Route path="/edituser/:email" element= {<PrivateRouter element={<Edituser/>} />} />
                <Route path="/view/:email" element = {<PrivateRouter element={<View/>} /> } />
                <Route path="/*" element={<Page404/>} />
                <Route path="/uipage" element={<Uipage/>} />
                <Route path="/formsformik" element={<Formsformik/>}/>
            </Routes>
          </BrowserRouter>
        </>
    )
}

export default Router;