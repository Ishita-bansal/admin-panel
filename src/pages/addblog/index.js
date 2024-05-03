import React, { useState } from "react";
import "./addblog.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {updateDoc, addDoc, collection, getFirestore, doc } from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";
import {getStorage , ref as storageRef , uploadBytes , getDownloadURL} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
const storage = getStorage(app);
const firestore = getFirestore(app);

const defaultvalues = {
  title: "",
  img: "",
  desc: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required*"),
  img:yup.mixed().test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
    if (!value) return true; 
    const supportedFormats = ["image/jpeg","image/jpg", "image/png"];
    return supportedFormats.includes(value.type);
  }).required("File is required"),
  desc: yup.string().required("Required*"),
});

function Addblog() {
  const navigate = useNavigate();
     const [imagefile , setimagefile] = useState(null);
     const [imageUrl, setImageUrl] = useState("");

     const handleimagefile = (e) =>{
         setimagefile(e.target.files[0]);
    }

  const writeData = async () => {
     try{
      const result = await addDoc(collection(firestore, "Tic-tacs-games"), {
        title: values.title,
        img: "",
        desc: values.desc,
      });
      const imageRef = storageRef(storage,`images/${result.id}`)
       await uploadBytes(imageRef,imagefile);
      const url = await getDownloadURL(imageRef);
       

        console.log("imageUrl=====>",url);
       await updateDoc(doc(firestore, "Tic-tacs-games",result.id), {
        img: url,
      });
      setImageUrl(url);
      
      }
     catch(error){
      console.error("Error adding blog: ", error);
     }
    }
    
  const onSubmit = async(values) => {
    console.log("add blog values", values);
     await writeData();
     navigate('/blogdetail');
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
      <h1 style={{marginTop:"5px"}}>Add Blog</h1>
      <div className="blog-form-container">
        <form onSubmit={handleSubmit}>
          <div className="blog-input-fields">
            <div className="blog-input">
              <input
                type="text"
                value={values.title}
                onChange={(e)=>{setFieldValue("title",e.target.value)}}
                onBlur={() => setTouched({ ...touched, title: true })}
                placeholder="title"
              />
              {touched.title && errors.title ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
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
            <div className="blog-jodit-input">
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
                  {errors.title}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>text</p>
              )}
            </div>
          </div>
          <div className="blog-btn">
            <button type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addblog;
