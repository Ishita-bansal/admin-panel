import React from "react";
import "./addblog.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";
const firestore = getFirestore(app);
const defaultvalues = {
  title: "",
  img: "",
  desc: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required*"),
  img: yup.mixed().required("File is required"),
  desc: yup.string().required("Required*"),
});

function Addblog() {
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "Tic-tacs-games"), {
      title: values.title,
      img: values.img,
      desc: values.desc,
    });
    console.log("values",result);
  };
  const onSubmit = (values) => {
    console.log("add blog values", values);
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
      <h1>Add Blog</h1>
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

export default Addblog;
