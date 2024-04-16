import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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

  const usertable = useSelector((state) => state?.Registerreducer);
  // console.log("user table=======>", usertable);

  const userdata = usertable.registerUser || [];
  // console.log("user data=====>",userdata);

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setrowsperPage(newRowsPerPage);
    setPage(0);
  };


  const onActionsHandler=(obj,user)=>{
    if(obj.indetifier==="edit")
    {
      alert("data");
      // navigate(`/edituser/${user.email}`, { state: { user } }); 
      navigate(`/edituser/${user.email}`)
      
    }
    if(obj.indetifier==="delete")
    {
   const filteredarray = userdata?.filter((use)=>{
        return use.email !== user.email
      })
      console.log("users data=====",filteredarray);
        dispatch(register(filteredarray));
    }
    if(obj.indetifier==="view")
    {
        // navigate('/edituser')
        alert("view")
    }
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>User Management</h1>

        <button onClick={() => navigate("/adduser")} className="table-btn">
          <FontAwesomeIcon icon={faPlus} /> Add User
        </button>
      </div>
      <TableContainer
        sx={{
          width: "75%",
          height: "650px",
          backgroundColor: "#f2f2f2",
          margin: "50px",
          borderRadius: "20px",
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
            {userdata
              ?.slice(page * rowsperPage, page * rowsperPage + rowsperPage)
              ?.map((users) => (
                <TableRow key={users.email}>
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
                          onClick={() =>onActionsHandler(obj,users)}
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
            count={userdata.length}
            rowsPerPage={rowsperPage}
            page={page}
            onPageChange={onChangePage}
            onChange={onChangeRowsPerPage}
          />
        </div>
      </TableContainer>
    </div>
  );
}

export default Tabledashboard;

