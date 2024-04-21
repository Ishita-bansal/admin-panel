import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { collection, getFirestore,getDocs} from "firebase/firestore";
import { app } from "../../firebase/firebaseconfig";

const firestore = getFirestore(app);
const Viewblog = ()=>{
    const [reciveData, setReciveData] = useState([]);
    const [currentdata , setcurrentdata] = useState(null);
    const {id} = useParams();
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
      console.log("------------>",currentdata);
      return(
        <>
        <h1 style={{marginTop:"60px"}}>User Data</h1>
        {
            currentdata &&
            <div style={{borderRadius:"30px",margin:"40px",backgroundColor:"#f2f2f2",padding:"60px",width:"100%",height:"50vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",gap:"20px"}}>

            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Title:</h3>
                <p>{currentdata.title}</p>
            </div>
            <div style={{display:"flex" ,gap:"20px",fontSize:"25px"}}>
                <h3 style={{textAlign:"center"}}>Img:</h3>
               <img style={{width:"30%"}} src={currentdata.img} alt="image" />
            </div>
            <div style={{display:"flex" , gap:"20px",alignItems:"baseline",fontSize:"25px"}}>
                <h3>Desc:</h3>
                <p style={{overflowY: "scroll", maxHeight: "100px"}}>{currentdata.desc}</p>
            </div>
        </div>
        }
       
        </>
      )
}

export default Viewblog;