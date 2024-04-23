import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {updateDoc, addDoc, collection, getFirestore, doc } from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";
import {getStorage , ref as storageRef , uploadBytes , getDownloadURL} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import  "./addproduct.css";
const storage = getStorage(app);
const firestore = getFirestore(app);

const defaultvalues = {
  productname: "",
  img: "",
  price: "",
  category:"Food",
  desc:""
};

const validationSchema = yup.object().shape({
  productname: yup.string().required("Required*"),
  img:yup.mixed().test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
    if (!value) return true; 
    const supportedFormats = ["image/jpeg","image/jpg", "image/png"];
    return supportedFormats.includes(value.type);
  }).required("File is required"),
  price: yup.number().required("Required*"),
  category: yup.string().notOneOf([""], "You must select an option!"),
  desc:yup.string().required("Required*")
});

function Addproduct() {
  const navigate = useNavigate();
     const [imagefile , setimagefile] = useState(null);
     const [imageUrl, setImageUrl] = useState("");

     const handleimagefile = (e) =>{
         setimagefile(e.target.files[0]);
    }

  const writeData = async () => {
     try{
      const result = await addDoc(collection(firestore, "products"), {
        productname: values.productname,
        img: "",
        price:values.price,
        category:values.category,
        desc:values.desc
      });
      const imageRef = storageRef(storage,`productimage/${result.id}`)
       await uploadBytes(imageRef,imagefile);
      const url = await getDownloadURL(imageRef);
       await updateDoc(doc(firestore, "products",result.id), {
        img: url,
      });
      setImageUrl(url);
      }
     catch(error){
      console.error("Error adding Products: ", error);
     }
    }
  
    
  const onSubmit = async(values) => {
    console.log("add product values", values);
     await writeData();
     navigate('/productlist');
     console.log("values=========",values.category);
  };

  const formik = useFormik({
    initialValues: defaultvalues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { values, setFieldValue, handleSubmit, setTouched, touched, errors } = formik;
  return (
    <>
      <h1 style={{marginTop:"60px"}}>Add Product</h1>
      <div className="product-form-container">
        <form onSubmit={handleSubmit}>
          <div className="product-input-fields">
            <div className="product-input">
              <input
                type="text"
                value={values.productname}
                onChange={(e)=>{setFieldValue("productname",e.target.value)}}
                onBlur={() => setTouched({ ...touched, productname: true })}
                placeholder="Product Name" />
              {touched.productname && errors.productname ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}>
                  {errors.productname}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>
        
            <div className="product-input">
              <input
                id="inputTag"
                type="file"
                onChange={(e)=>{handleimagefile(e);
                  setFieldValue("img", e.currentTarget.files[0]);
                  setTouched({ ...touched, img: true })
                }} />
              {touched.img && errors.img ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.img}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>
            
            <div className="product-input">
            <input type="number"
            placeholder="price"
                value={values.price}
                onChange={(e) => setFieldValue("price", e.target.value)}
                onBlur={() => setTouched({ ...touched, price: true })}
              /> 
              {touched.price && errors.price ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.price}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div> 
            <div className="product-input">
                <select value={values.category} onChange={(e)=>{setFieldValue("category",e.target.value)}}  onBlur={() => setTouched({ ...touched, category: true })}>
                    <option value="Food">Food</option>
                    <option value="Games">Games</option>
                    <option value="Beverages">Beverages</option>
                </select>
            </div>
            {touched.category && errors.category ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.category}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
        
          <div className="editor-product-input" style={{width:"500px",height:"300px"}}>  
            <JoditEditor  
                value={values.desc}
                onChange={(content) => setFieldValue("desc", content)}
                onBlur={() => setTouched({ ...touched, desc: true })}
              />
              
              {touched.desc && errors.desc ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.desc}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button type="submit" style={{backgroundColor:"#15313cbd",width:"150px",height:"50px",borderRadius:"40px",border:"none",outoline:"none",color:"white",margin:"50px"}}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addproduct;
