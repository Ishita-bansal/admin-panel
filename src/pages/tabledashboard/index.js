import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  Modal,
  Box,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./tabledashboard.css";
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
import { register } from "../../redux/action";

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

function Tabledashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsperPage, setrowsperPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedData,setSelecteData]=useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const handleDel = () => {
    
    // console.log(selectedData)
    const filteredarray = userdata?.filter((use) => {
      return use.email !== selectedData.email;
    });
    console.log("users data=====", filteredarray);
    dispatch(register(filteredarray));
    setSelecteData({});
  };

  const usertable = useSelector((state) => state?.Registerreducer);
  // console.log("user table=======>", usertable);

  const userdata = usertable.registerUser || [];
  // console.log("user data=====>",userdata);

  const loginuserData = useSelector((state)=>state?.Loginreducer);
  // console.log("loginuserData========>",loginuserData);

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setrowsperPage(newRowsPerPage);
    setPage(0);
  };
  const onActionsHandler = (obj, user) => {

    if (obj.indetifier === "edit") {
      navigate(`/edituser/${user.email}`);
    }

    if (obj.indetifier === "delete") {
      handleDel();
      setSelecteData(user)
      setOpen(true);
    }

    if (obj.indetifier === "view") {
         navigate(`/view/${user.email}`);    
    }
  };

  const onModalClose=()=>{
    setOpen(false)
    setSelecteData({})
  }

  const filteredData = userdata.filter(item =>
    item.email.includes(searchQuery)
  );

  return (
    <div className="table-container">
      <div className="table-head">
        <h1>User Management</h1>
      </div>
      <TableContainer
        sx={{
          width: "fit-content",
          // height: "650px",
          backgroundColor: "#f2f2f2",
          marginTop: "20px",
          borderRadius: "20px",
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
        <button onClick={() => navigate("/adduser")} className="table-btn">
          <FontAwesomeIcon icon={faPlus} /> Add User
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
                Password
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                Confirm Password
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
              ?.map((users) => (
                <TableRow key={users.email}
                style={{
                  backgroundColor: users.email === loginuserData.email ? "#f2f2f2" : "inherit",
                  color: users.email === loginuserData.email ? "grey" : "inherit",
                }} >
                  <TableCell style={{ textAlign: "center", fontSize: "18px" }}>
                    {users.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", fontSize: "18px" }}>
                    {users.email}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", fontSize: "18px" }}>
                    {users.password}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", fontSize: "18px" }}>
                    {users.confirmpass}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {icons.map((obj, index) => (
                        <button
                          onClick={() => onActionsHandler(obj, users)}
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
                          disabled={users.email === loginuserData.email && obj.indetifier === "delete"}
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
            count={userdata.length}
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
  );
}
export default Tabledashboard;
