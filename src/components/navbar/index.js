
import {
    Fade,
    Box,
    AppBar,
    Avatar,
    IconButton,
    Tooltip,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Modal,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { logout } from "../../redux/action";
  import TOASTMESSAGE from "../../constants";
  import { toast } from "react-toastify";

const Navbar = ()=>{

    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state?.Loginreducer);
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      height: 300,
      backgroundColor: "white",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  
    const navigate = useNavigate();
    const [anchorEl, setanchorEl] = useState(null);
    const [open, setopen] = useState(false);
    const [openModal, setopenmd] = useState(false);
  
    const handlelogout = () => {
      dispatch(logout());
      toast.success(TOASTMESSAGE.LOGOUT);
      navigate("/login");
    };
  
    const handlemenu = (e) => {
      setanchorEl(e.currentTarget);
      setopen(true);
    };
  
    const handleClose = () => {
      setopen(false);
    };
  
    const handlemd = () => {
      setopenmd(true);
    };
  
    const handlemdclose = () => {
      setopenmd(false);
    };
  

    return(
        <>
      <AppBar style={{ height: "90px", zIndex: -1 ,backgroundColor:"#15283c" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Typography style={{ fontSize: "35px", fontWeight: "bolder" ,marginLeft:"23%"}}>
            WELCOME
          </Typography>
          <Tooltip title="Open settings" >
            <IconButton onClick={handlemenu}>
              <Avatar style={{ textTransform: "capitalize" }}>
                {userDetail?.name?.[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            style={{ marginTop: "5px" }}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handlemd}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Modal open={openModal} onClose={handlemdclose}>
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              style={{
                textAlign: "center",
                padding: "20px",
                fontSize: "30px",
                fontWeight: "bolder",
              }}
            >
              Are you sure you want to logout?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                border: "none",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handlelogout}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlemdclose}
              >
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
        </>
    )
}

export default Navbar;








