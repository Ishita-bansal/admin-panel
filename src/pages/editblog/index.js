import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { doc,updateDoc, collection, getFirestore,getDocs} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { app } from "../../firebase/firebaseconfig";
import {getStorage , ref as storageRef , uploadBytes , getDownloadURL} from "firebase/storage";
import JoditEditor from "jodit-react";
const storage = getStorage(app);
const firestore = getFirestore(app);

const validationSchema = yup.object().shape({
  title: yup.string().required("Required*"),
  img:yup.mixed().test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
    if (!value) return true; 
    const supportedFormats = [ "image/jpeg","image/jpg", "image/png"];
    return supportedFormats.includes(value.type);
  }).required("File is required"),
  desc: yup.string().required("Required*"),
});

function Editblog() {
    const navigate = useNavigate();
    const [reciveData, setReciveData] = useState([]);
    const [currentdata , setcurrentdata] = useState(null);
    const [imagefile , setimagefile] = useState(null);
   

    const handleimagefile = (e) =>{
      setimagefile(e.target.files[0]);
 }


    const { id } = useParams();

    const handleUpdate = async () => {
      try {

        const imageRef = storageRef(storage,`images/${id}`)
       await uploadBytes(imageRef,imagefile);
      const url = await getDownloadURL(imageRef);

        const docRef = doc(firestore, 'Tic-tacs-games', id);
        await updateDoc(docRef, {
          title: values.title,
          img: url,
          desc: values.desc
        });
        navigate('/blogdetail');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    };



    const getdocument = async () => {
        try {
          const collectionRef = collection(firestore, "Tic-tacs-games");
          const querySnapshot = await getDocs(collectionRef);
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          return data;
        } catch (error) {
          console.error("Error fetching documents:", error);
          return [];
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getdocument();
            setReciveData(data);
          } catch (error) {
            console.error("Error fetching documents:", error);
          }
        };
        fetchData();
      }, []);
     
      useEffect(() => {
        if (reciveData.length > 0) {
          const user = reciveData.find((info) => info.id === id);
          setcurrentdata(user);
        }
       
      }, [id,reciveData]);
  const onSubmit = (values) => {
    
    // console.log("Edit values", values);
  };

  const formik = useFormik({
    initialValues:currentdata || { title: "", img: "", desc: "" },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize:true
  });

  const { values, setFieldValue, handleSubmit, setTouched, touched, errors } = formik;
  // console.log("values====>",values);
  return (
    <>
      <h1 style={{marginTop:"60px"}}>Edit Blog</h1>
      <div className="blog-form-container">
        <form onSubmit={handleSubmit}>
          <div className="blog-input-fields">
            <div className="blog-input">
              <input
                type="text"
                value={values.title}
                onChange={(e) => setFieldValue("title", e.target.value)}
                onBlur={() => setTouched({ ...touched, title: true })}
                placeholder="title"
              />
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
                onChange={(e) => {
                   handleimagefile(e);
                    setFieldValue("img", e.currentTarget.files[0]);
                      setTouched({ ...touched, img: true });
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
            <JoditEditor
                value={values.desc}
                onChange={(content) => setFieldValue("desc", content)}
                onBlur={() => setTouched({ ...touched, desc: true })}
              />
              {/* <textarea
                rows="5"
                cols="50"
                placeholder="description here"
                value={values.desc}
                onChange={(e) => setFieldValue("desc", e.target.value)}
                onBlur={() => setTouched({ ...touched, desc: true })}
              ></textarea> */}
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
            <button type="submit" onClick={handleUpdate} >
              EDIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editblog;