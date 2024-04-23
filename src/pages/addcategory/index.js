import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {updateDoc, addDoc, collection, getFirestore, doc } from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";
import {getStorage , ref as storageRef , uploadBytes , getDownloadURL} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const storage = getStorage(app);
const firestore = getFirestore(app);

const defaultvalues = {
  title: "",
  img: "",
  total: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required*"),
  img:yup.mixed().test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
    if (!value) return true; 
    const supportedFormats = ["image/jpeg","image/jpg", "image/png"];
    return supportedFormats.includes(value.type);
  }).required("File is required"),
  total: yup.number().required("Required*"),
});

function Addcategory() {
  const navigate = useNavigate();
     const [imagefile , setimagefile] = useState(null);
     const [imageUrl, setImageUrl] = useState("");

     const handleimagefile = (e) =>{
         setimagefile(e.target.files[0]);
    }

  const writeData = async () => {
     try{
      const result = await addDoc(collection(firestore, "categories"), {
        title: values.title,
        img: "",
        total: values.total,
      });
      const imageRef = storageRef(storage,`categoryimage/${result.id}`)
       await uploadBytes(imageRef,imagefile);
      const url = await getDownloadURL(imageRef);
       await updateDoc(doc(firestore, "categories",result.id), {
        img: url,
      });
      setImageUrl(url);
      }
     catch(error){
      console.error("Error adding category: ", error);
     }
    }
  
    
  const onSubmit = async(values) => {
    console.log("add categoies values", values);
     await writeData();
     navigate('/category');
  };

  const formik = useFormik({
    initialValues: defaultvalues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { values, setFieldValue, handleSubmit, setTouched, touched, errors } =
    formik;
  return (
    <>
      <h1 style={{marginTop:"60px"}}>Add Category</h1>
      <div className="blog-form-container">
        <form onSubmit={handleSubmit}>
          <div className="blog-input-fields">
            <div className="blog-input">
              <input
                type="text"
                value={values.title}
                onChange={(e)=>{setFieldValue("title",e.target.value)}}
                onBlur={() => setTouched({ ...touched, title: true })}
                placeholder="title" />
              {touched.title && errors.title ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}>
                  {errors.title}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>

            <div className="blog-input">
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
            <div className="blog-input">
            <input type="number"
            placeholder="total Items"
                value={values.total}
                onChange={(e) => setFieldValue("total", e.target.value)}
                onBlur={() => setTouched({ ...touched, total: true })}
              />
              
              {touched.total && errors.total ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.total}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>
          </div>
          <div >
            <button type="submit" style={{backgroundColor:"#15313cbd",width:"150px",height:"50px",borderRadius:"40px",border:"none",outoline:"none",color:"white",marginLeft:"30px"}}>
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addcategory;
