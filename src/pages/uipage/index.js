import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import zIndex from "@mui/material/styles/zIndex";
const Uipage = () => {
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');`}
      </style>

      <div
        style={{
          width: "1600px",
          height: "800px",
          background:
            "linear-gradient(90deg, #4A67FF 100%, #3956F0 100%, #798EFF 100% , #8496F4 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "200px",
            fontWeight: "500",
            fontFamily: "Poppins",
            fontSize: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "white",
              lineHeight: "62.2px",
            }}
          >
            How it works?
          </h1>
        </div>
        <div
          style={{
            height: "500px",
            display: "flex",
            gap: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "464px",
              height: "462px",
              borderRadius: "40px",
              backgroundColor: "bisque",
            }}
          >
            <div
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50px",
                border: "3px solid #FC7785",
                position: "absolute",
                top: "22%",
                left: "2%",
                color: "black",
                backgroundColor: "bisque",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              1
            </div>
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "25%",
                fontSize: "70px",
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h1
              style={{
                fontFamily: "poppins",
                textAlign: "start",
                paddingTop: "125px",
                paddingLeft: "30px",
              }}
            >
              Register
            </h1>
            <div
              style={{
                width: "350px",
                height: "3px",
                backgroundColor: "grey",
                margin: "30px",
              }}
            ></div>
            <div
              style={{
                paddingLeft: "30px",
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "32px",
                fontFamily: "Poppins",
              }}
            >
              Register your company for FREE <br></br>- use free modules (no
              credit <br></br>card required)
            </div>
          </div>
          <div
            style={{
              width: "464px",
              height: "462px",
              borderRadius: "40px",
              backgroundColor: "bisque",
            }}
          >
            <div
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50px",
                border: "3px solid #FC7785",
                position: "absolute",
                top: "22%",
                left: "35%",
                color: "black",
                backgroundColor: "bisque",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              2
            </div>
          </div>
          <div
            style={{
              width: "464px",
              height: "462px",
              borderRadius: "40px",
              backgroundColor: "bisque",
            }}
          >
            <div
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50px",
                border: "3px solid #FC7785",
                position: "absolute",
                top: "22%",
                left: "65%",
                color: "black",
                backgroundColor: "bisque",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              3
            </div>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <p style={{ textAlign: "center", color: "white" }}>
            Rapidly increase the value of your buisness
          </p>
        </div>
      </div>
    </>
  );
};

export default Uipage;
