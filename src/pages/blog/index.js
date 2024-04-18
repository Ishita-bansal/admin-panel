import React from "react";
import {img1} from "../../../public/image/game1.jpg";
import {img2} from "../../../public/image/game2.jpg";
import {img3} from "../../../public/image/game3.jpg";
function Blog(){
    return(
        <>
           <div className="blog-container">
                
           </div>
           <div class="row" className="blog-Items">
                 <div class="col-lg-4">
                    <img src={img1} alt=""/>
                    <h3></h3>
                    <p></p>
                 </div>
                 <div class="col-lg-4">
                    <img src={img2} alt=""/>
                    <h3></h3>
                 </div>
                 <div class="col-lg-4">
                    <img src={img3} alt=""/>
                    <h3></h3>
                 </div>
           </div>
        </>
    )
}

export default Blog;