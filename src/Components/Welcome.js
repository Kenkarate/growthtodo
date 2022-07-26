import './Welcome.css'
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
    
      <div className='welcome'>
        <div className="float-start " style={{ width: "49%" }}>
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
          <div></div>
        </div>
      </div>
    
  );
}

export default Welcome;
