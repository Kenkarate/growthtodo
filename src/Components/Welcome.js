import "./Welcome.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/Config";

function Welcome() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const HandleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/homepage");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="welcome">
      <div className="float-start " style={{ width: "30%", marginLeft: "10%" }}>
        <div>
          <img
            src="./images/logo.jpg"
            style={{ width: "60px", paddingTop: "10%" }}
          ></img>
        </div>
        <div style={{ position: "absolute", top: "40%", left: "10%" }}>
          <h1>Login</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.{" "}
          </p>
          <GoogleButton onClick={HandleSignup} />
        </div>
      </div>

      <div className="float-end " style={{ width: "50%", height: "100%" }}>
        <div>
          <img style={{width: "100%", height: "100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",float:"right"}} 
            src="./images/homeimg.jpg"></img>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
