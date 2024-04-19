import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addDoc, collection, getFirestore,getDocs} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { app } from "../../firebase/firebaseconfig";
const firestore = getFirestore(app);

const validationSchema = yup.object().shape({
  title: yup.string().required("Required*"),
  img: yup.mixed().required("File is required"),
  desc: yup.string().required("Required*"),
});

function Editblog() {
    const [reciveData, setReciveData] = useState([]);
    const [currentdata , setcurrentdata] = useState(null);
    const { id } = useParams();
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
            console.log("data======>",data);
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
    
  
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "Tic-tacs-games"), {
      title: values.title,
      img: values.img,
      desc: values.desc,
    });
    console.log("values",result);
  };
  const onSubmit = (values) => {
    
    console.log("Edit values", values);
  };

  const formik = useFormik({
    initialValues:currentdata,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize:true
  });

  const { values, setFieldValue, handleSubmit, setTouched, touched, errors } = formik;
  console.log("values====>",values);
  return (
    <>
      <h1>Edit Blog</h1>
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
                value={values.img}
                onChange={(e) => setFieldValue("img", e.target.value)}
                onBlur={() => setTouched({ ...touched, img: true })}
              />
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
              <textarea
                rows="5"
                cols="50"
                placeholder="description here"
                value={values.desc}
                onChange={(e) => setFieldValue("desc", e.target.value)}
                onBlur={() => setTouched({ ...touched, desc: true })}
              ></textarea>
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
            <button type="submit" onClick={writeData}>
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editblog;