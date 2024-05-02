import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
//   import "./tabledashboard.css";
import { styled } from "@mui/system";
import { faClose, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseconfig";
import {
  collection,
  getFirestore,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firestore = getFirestore(app);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
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

const Order = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reciveData, setReciveData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsperPage, setrowsperPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setrowsperPage(newRowsPerPage);
    setPage(0);
  };

  const getdocument = async () => {
    try {
      const collectionRef = collection(firestore, "orders");
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

  console.log("recieveddd data===>", reciveData);

  const onModalClose = () => {
    setOpen(false);
  };

  const onModalopen = () => {
    setOpen(true);
  };

  const filteredData = reciveData.filter((item) =>
    item.email.includes(searchQuery)
  );

  console.log(filteredData.orderdata);
  const orderData = filteredData.orderdata;
  console.log("orderData====>0", orderData);
  return (
    <>
      <div className="table-container">
        <div className="table-head">
          <h1>Order Management</h1>
        </div>
        <TableContainer
          sx={{
            width: "fit-content",
            backgroundColor: "#f2f2f2",
            marginTop: "20px",
            borderRadius: "20px",
            overflowX: "scroll",
            maxWidth: "90%",
            overflowY: "scroll",
            maxHeight: "100%",
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
                  Name
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Ship to Address
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Postal code
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  state
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  City
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Credit Number
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Expiry Date
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  credit Security code
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Product Details
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsperPage, page * rowsperPage + rowsperPage)
                ?.map((users) => (
                  <TableRow key={users.email}>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users?.firstname} {users?.lastname}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.email}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.phone}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.address}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.postcode}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.states}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.cities}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.creditno}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.expirydate}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {users.creditcode}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      <button
                        onClick={onModalopen}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {users.total}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledTablePagination
              rowsPerPageOptions={[2, 5, 10, 15, 25]}
              count={reciveData.length}
              rowsPerPage={rowsperPage}
              page={page}
              onPageChange={onChangePage}
              onChange={onChangeRowsPerPage}
            />
          </div>
        </TableContainer>
      </div>
      <div>
        <Modal
          open={open}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              onModalClose();
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableBackdropClick
        >
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={onModalClose}
                variant="contained"
                sx={{ width: "50px", height: "60px" }}
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </div>
            <Typography
              style={{
                textAlign: "center",
                padding: "10px",
                fontWeight: "bolder",
              }}
              id="modal-modal-title"
              variant="h3"
              component="h2"
            >
              Product Details
            </Typography>
  <div style={{ fontSize: "25px", display: "flex", justifyContent: "space-between", padding: "10px",fontWeight:"bolder" }}>
    <div style={{ width: "30%" }}>Product Name</div>
    <div>Quantity</div>
    <div>Price</div>
  </div>
            {filteredData.map((item) =>
              item.orderdata.map((product) => (
                <div key={product.id} style={{fontSize:"25px",display:"flex",justifyContent:"space-between",padding:"10px"}}>
                 <div style={{width:"30%"}}>{product.productname}</div>
                 <div>{product.quantity}</div>
                 <div>₹{product.price}</div>
                </div>
              ))
            )}
            
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Order;
