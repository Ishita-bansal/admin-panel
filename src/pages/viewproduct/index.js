import { collection, getFirestore, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase/firebaseconfig";
import { useParams } from "react-router-dom";
const firestore = getFirestore(app);

function Viewproduct() {
  const [reciveData, setReciveData] = useState([]);
  const [currentdata, setcurrentdata] = useState(null);
  const { id } = useParams();
  const getdocument = async () => {
    try {
      const collectionref = collection(firestore, "products");
      const querySnapshot = await getDocs(collectionref);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.log("errors=====>", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getdocument();
        setReciveData(data);
        console.log("data======>", data);
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
  }, [id, reciveData]);

  console.log("recievedddddddataaaaa", currentdata);



  return (
    <>
      <h1 style={{ marginTop: "50px" }}>Categories Data</h1>
      {currentdata && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            borderRadius: "20px",
            padding: "10px",
            marginTop: "60px",
            backgroundColor: "#f2f2f2",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            <h3>Product Name:-</h3>
            <p>{currentdata?.productname}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h3>Image:-</h3>
            <img src={currentdata?.img} alt="image" width="30%" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            <h3>Price:-</h3>
            <p>{currentdata?.price}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            <h3>Category:-</h3>
            <p>{currentdata?.category}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            <h3>Description:-</h3>
            <p dangerouslySetInnerHTML={{ __html: currentdata.desc }}></p>
          </div>
        </div>
      )}
    </>
  );
}

export default Viewproduct;
