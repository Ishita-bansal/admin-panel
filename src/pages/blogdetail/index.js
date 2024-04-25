import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Modal,
  Box,
  Typography,
  TextField
} from "@mui/material";

import {
  collection,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import "./blog.css";
import { styled } from "@mui/system";
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../../firebase/firebaseconfig";
import { deleteDoc } from "firebase/firestore";
import {getStorage,ref as storageRef,deleteObject} from "firebase/storage";
import { loader } from "../../redux/action";
import {Loaderreducer} from "../../redux/reducer/loaderreducer";
const firestore = getFirestore(app);
const storage = getStorage(app);


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
};

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiTablePagination-toolbar": {
    "& > p": {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1.15rem",
      paddingTop: "20px",
      color: "grey",
      fontWeight: 600,
    },
  },
  "& .MuiTablePagination-select": {
    backgroundColor: "grey",
  },
}));

const icons = [
  { icon: faPencil, indetifier: "edit" },
  { icon: faTrash, indetifier: "delete" },
  { icon: faEye, indetifier: "view" },
];

function Blogdetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsperPage, setrowsperPage] = useState(5);
  const [reciveData, setReciveData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selecteddata , setSelecteddata] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const isLoading = useSelector(state=>state?.Loaderreducer?.isLoader);
  console.log('isLoading==>',isLoading);

  const handleDel = async() => { 
    if (!selecteddata || !selecteddata.id) {
      console.error("Selected data is undefined or does not have an ID");
      return;
    }  
  try{
    const imageRef = storageRef(storage, `images/${selecteddata.id}`);
    await deleteObject(imageRef);

    const docRef = doc(firestore, "Tic-tacs-games", selecteddata.id);
    await deleteDoc(docRef);

       const data = reciveData.filter((info)=>{
             return info.id !== selecteddata.id;
        }) 

     setReciveData(data);
     setSelecteddata({});
     setOpen(false);
    }
    catch(error){
      console.error("Error deleting blog: ", error);
    }
  }
  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setrowsperPage(newRowsPerPage);
    setPage(0);
  };

  const onModalClose=()=>{
    setOpen(false);
  }

  

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
        dispatch(loader({isLoader:true}));
        const data = await getdocument();
        setReciveData(data);
      // reciveData && dispatch(loader({ isLoader: false }))
      } 
      catch (error) {
        console.error("Error fetching documents:", error);
    }
    };
  fetchData();  
  }, []);

  const onActionsHandler = (obj, detail) => {
   console.log("details=======>",detail);
    if (obj.indetifier === "edit") {
        navigate(`/editblog/${detail.id}`);
    }

    if (obj.indetifier === "delete") {
      handleDel();
      setSelecteddata(detail);
      setOpen(true);

    }

    if (obj.indetifier === "view") {
       navigate(`/viewblog/${detail.id}`);
    }
  };

  const filteredData = reciveData.filter(item =>
    item.title.includes(searchQuery)
  );

  // const isLoading = useSelector((state) => state?.Loaderreducer.isLoader);
  // console.log("i=====loading",isLoading);

  return (
   <>
      <div className="table-container">
          <div className="table-head">
          <h1>Blog Management</h1>
          </div>
    
        <TableContainer
          sx={{
            width: "1000px",
            backgroundColor: "#f2f2f2",
            marginTop: "50px",
            borderRadius: "20px",
            border:"4px solid",
            overflowY: "scroll",
            maxHeight: "100%"
          }}
        >
          <div className="table-header">
          <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ margin: "10px" }}
        />
          <button onClick={() => navigate("/addBlog")} className="table-btn">
            <FontAwesomeIcon icon={faPlus} /> Add Blog
          </button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsperPage, page * rowsperPage + rowsperPage)
                .map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {detail.title}
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}>
                     <img style={{width:"35%"}} src={detail.img} alt="image"/>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontSize: "18px", 
                      }}
                    >
                      <div style={{ overflowY: "scroll", maxHeight: "100px" }}  dangerouslySetInnerHTML={{__html: detail.desc}} >
                      
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {icons.map((obj, index) => (
                          <button
                            onClick={() => onActionsHandler(obj,detail)}
                            key={index}
                            style={{
                              border: "none",
                              outline: "none",
                              cursor: "pointer",
                              backgroundColor: "#15313cbd",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              color: "white",
                              marginLeft: index > 0 ? "5px" : "0",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={obj?.icon}
                              style={{ margin: "0 5px", cursor: "pointer" }}
                            />
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledTablePagination
              rowsPerPageOptions={[2, 5, 10, 15, 25]}
              count={reciveData?.length}
              rowsPerPage={rowsperPage}
              page={page}
              onPageChange={onChangePage}
              onChange={onChangeRowsPerPage}
            />
          </div>
        </TableContainer>
        <div>
        <Modal
          open={open}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              onModalClose();
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableBackdropClick 
        >
          <Box sx={style}>
            <Typography
              style={{
                textAlign: "center",
                padding: "10px",
                fontWeight: "bolder",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2">
              Are you sure you want to delete?
            </Typography>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Button onClick={handleDel} variant="contained" sx={{ mt: 2 }}>
                Yes
              </Button>
              <Button
                onClick={onModalClose}
                variant="contained"
                sx={{ mt: 2 }}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      </div>
   
      
    </>
  );
}

export default Blogdetail;
