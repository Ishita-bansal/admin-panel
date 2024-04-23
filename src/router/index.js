import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import React from "react";
import {Register,Login,Dashboard,Profile,Tabledashboard,Page404, Adduser, Edituser,Uipage, Formsformik,View,Viewblog, Blogdetail, Addblog, Editblog, Category,Addcategory, Viewcategory, Productlist,Addproduct,Viewproduct} from "../pages"
import { useSelector } from "react-redux";
import Maincontainer from "../components/maincontainer";
import Demofirebase from "../demofirebase";
import Editcategory from "../pages/editcategory";
import Editproduct from "../pages/editproduct";

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
                <Route path="/blogdetail" element={<PrivateRouter element={<Blogdetail/>} />} />
                <Route path="/addblog" element={<PrivateRouter element={<Addblog/>} />} />
                <Route path="/editblog/:id" element={<PrivateRouter element={<Editblog/>} />} />
                <Route path="/viewblog/:id" element={<PrivateRouter element={<Viewblog/>} />} />
                <Route path="/category" element={<PrivateRouter element={<Category/>} />} />
                <Route path="/Addcategory" element={<PrivateRouter element={<Addcategory/>} />} />
                <Route path="/editcategory/:id" element={<PrivateRouter element={<Editcategory/>} />} />
                <Route path="/viewcategory/:id" element={<PrivateRouter element={<Viewcategory/>} />} />
                <Route path="/productlist" element={<PrivateRouter element={<Productlist/>} />} />
                <Route path="/Addproduct" element={<PrivateRouter element={<Addproduct/>} />} />
                <Route path="/Editproduct/:id" element={<PrivateRouter element={<Editproduct/>} />} />
                <Route path="/viewproduct/:id" element={<PrivateRouter element={<Viewproduct/>} />} />
                <Route path="/*" element={<Page404/>} />
                <Route path="/uipage" element={<Uipage/>} />
                <Route path="/formsformik" element={<Formsformik/>}/>
                <Route path="/demofirebase" element={<Demofirebase/>} />  
            </Routes>
          </BrowserRouter>
        </>
    )
}

export default Router;