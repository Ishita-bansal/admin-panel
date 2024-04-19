import React, { useState, useEffect } from "react";
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
  Typography
} from "@mui/material";

import {
  collection,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  getDocs,
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
const firestore = getFirestore(app);

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
 
  const handleDel = () => {
    
    // console.log(selectedData)
   
  };

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
        const data = await getdocument();
        setReciveData(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchData();
  }, []);

  const onActionsHandler = (obj, user) => {
    if (obj.indetifier === "edit") {
      //   navigate(`/edituser/${user.email}`);
    }

    if (obj.indetifier === "delete") {
      handleDel();
     
      setOpen(true);

    }

    if (obj.indetifier === "view") {
      //  navigate(`/view/${user.email}`);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <h1>Blog Management</h1>
          <button onClick={() => navigate("/addBlog")} className="table-btn">
            <FontAwesomeIcon icon={faPlus} /> Add Blog
          </button>
        </div>
        <TableContainer
          sx={{
            width: "950px",
            backgroundColor: "#f2f2f2",
            marginTop: "20px",
            borderRadius: "20px",
            border:"4px solid"
          }}
        >
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
              {reciveData
                ?.slice(page * rowsperPage, page * rowsperPage + rowsperPage)
                .map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {detail.title}
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {detail.img}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        fontSize: "18px", 
                      }}
                    >
                      <div style={{ overflowY: "scroll", maxHeight: "100px" }}>
                      {detail.desc}
                      </div>
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {icons.map((obj, index) => (
                          <button
                            onClick={() => onActionsHandler(obj)}
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
