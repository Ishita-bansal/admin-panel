import { collection,
     getFirestore, 
     addDoc,
      doc , 
      getDoc,
    query,
    getDocs,
    updateDoc,
where} from "firebase/firestore";
import { app } from "./firebase/firebaseconfig";
const firestore = getFirestore(app);


function Demofirebase(){
    const writeData = async () => {
        const result = await addDoc(collection(firestore, "games"), {
          name: "FOAM ZONE",
          desc: "The Foam Zone in an arcade zone sounds like a thrilling attraction! as you step into the Foam Zone, your senses are immediately engulfed by a sea of foam. The air is filled with excitement and anticipation as you prepare to dive, jump, or simply splash around in the cushiony foam.",
        });
        console.log("Results:-",result);
    }
        const makeSubCollection = async ()=>{
            await addDoc(collection(firestore ,'games/GmZsCS0mBRZ5ke6cA03C/moreAbout'),{
             mordesc:'infinity fun for everyone!'
            })  
      };
      const getDocument = async() =>{
         const ref = doc(firestore,'games','GmZsCS0mBRZ5ke6cA03C');
         const snap =  await getDoc(ref);
         console.log(snap.data());
      };

      const getDocumentsByQuery = async() => {
         const collectionref = collection(firestore,"users");
         const q = query(collectionref,where("isFemale","==" ,true));
         const snapshot =   await getDocs(q);
         snapshot.forEach((data) => console.log(data.data()))
        }

        const update = async () =>{
            const docRef = doc(firestore,'games','GmZsCS0mBRZ5ke6cA03C');
           await updateDoc(docRef,{
                name:'Infinities fun in foam zone'
            })
        }
    return(
        <>
        <h1>Firestore firebase</h1>
        <button onClick={writeData}>Put data</button>
        <button onClick={makeSubCollection}>Put sub data</button>
        <button onClick={getDocument}>get the document</button>
        <button onClick={getDocumentsByQuery}>getDocumentsByQuery</button>
        <button onClick={update}>update</button>
        </>
    )
}

export default Demofirebase;