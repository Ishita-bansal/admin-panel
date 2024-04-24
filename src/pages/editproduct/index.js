import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { app } from "../../firebase/firebaseconfig";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage(app);
const firestore = getFirestore(app);

const validationSchema = yup.object().shape({
  productname: yup.string().required("Required*"),
  img: yup
    .mixed()
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value) return true;
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      return supportedFormats.includes(value.type);
    })
    .required("Required*"),
  price: yup.number().required("Required*"),
  category: yup.string().notOneOf([""], "You must select an option!"),
  desc: yup.string().required("Required*"),
});

function Editproduct() {
  const navigate = useNavigate();
  const [reciveData, setReciveData] = useState([]);
  const [currentdata, setcurrentdata] = useState(null);
  const [imagefile, setimagefile] = useState(null);
  const [categorydata, setcategorydata] = useState([]);
  const handleimagefile = (e) => {
    setimagefile(e.target.files[0]);
  };
  const { id } = useParams();

  const handleUpdate = async () => {
    try {
      const imageRef = storageRef(storage, `productimage/${id}`);
      await uploadBytes(imageRef, imagefile);
      const url = await getDownloadURL(imageRef);

      const docRef = doc(firestore, "products", id);
      await updateDoc(docRef, {
        productname: values.productname,
        img: url,
        price: values.price,
        category: values.category,
        desc: values.desc,
      });
      navigate("/productlist");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const getdocument = async () => {
    try {
      const collectionRef = collection(firestore, "products");
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

  const getcategory = async () => {
    try {
      const collectionRef = collection(firestore, "categories");
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
        const data = await getcategory();
        setcategorydata(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchData();
  }, []);

  console.log("======>", reciveData);

  useEffect(() => {
    if (reciveData.length > 0) {
      const user = reciveData?.find((info) => info.id === id);
      setcurrentdata(user);
    }
  }, [id, reciveData]);

  console.log("current data",currentdata);

  const onSubmit = (values) => {
    handleUpdate();
  };

  const formik = useFormik({
    initialValues: currentdata, 
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const { values, setFieldValue, handleSubmit, setTouched, touched, errors } =
    formik;

  console.log("values====>", values);
  return (
    <>
      <h1 style={{ marginTop: "60px" }}>Edit Category</h1>
      <div className="blog-form-container">
        <form onSubmit={handleSubmit}>
          <div className="blog-input-fields" style={{ height: "700px" }}>
            <div className="blog-input">
              <input
                type="text"
                value={values?.productname}
                onChange={(e) => setFieldValue("productname", e.target.value)}
                onBlur={() => setTouched({ ...touched, productname: true })}
                placeholder="Product Name"
              />
              {touched.productname && errors.productname ? (
                <p
                  style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {errors.productname}
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
                }}
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
              <input
                type="number"
                value={values?.price}
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
            {/* product-input */}
            <div className="">
              <select
               defaultValue={currentdata?.category}
                value={values?.category}
                onChange={(e) => {
                  if (values?.desc !== undefined) {
                  setFieldValue("category", e.target.value);
                  }
                }}
                onBlur={() => setTouched({ ...touched, category: true })}>
                {categorydata?.map((info) => {
                  return <option style={{color:'black'}} key={info?.id} value={info.id}>{info.title}</option>;
                })}
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

            <div
              className="editor-product-input"
              style={{ width: "500px", height: "300px" }}
            >
              <JoditEditor
                value={values?.desc}
                onChange={(content) => {
                  if (values?.desc !== undefined) {
                    setFieldValue("desc", content);
                  }
                }}
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{
                backgroundColor: "#15313cbd",
                width: "150px",
                height: "50px",
                borderRadius: "40px",
                border: "none",
                outoline: "none",
                color: "white",
                margin: "10px",
              }}
              type="submit"
            >
              EDIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editproduct;
