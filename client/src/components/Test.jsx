import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyDB8lob_s8eKbBqhmrzRzeawx1MB9Rcd94",
  authDomain: "kabana-auth1.firebaseapp.com",
  projectId: "kabana-auth1",
  storageBucket: "kabana-auth1.appspot.com",
  messagingSenderId: "261726354219",
  appId: "1:261726354219:web:17bff88c8b8b576e8fa36e",
};

// Initialize Firebase
const Test = () => {
  const [otp, setOtp] = useState();
  const app = initializeApp(firebaseConfig);
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=AIzaSyDB8lob_s8eKbBqhmrzRzeawx1MB9Rcd94`;
  const setUpCaptcha = (number) => {
    const auth = getAuth(app);
    const recaptcha = new RecaptchaVerifier("sendCode", {}, auth);
    // render the rapchaVerifier.
    recaptcha.render();
    return signInWithPhoneNumber(auth, number, recaptcha);
  };
  const [res, setRes] = useState();
  const getOtp = async () => {
    try {
      const response = await setUpCaptcha("+919818946005");
      console.log(response);
      setRes(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtp = async () => {
    try {
      const response = await res.confirm(otp);
      console.log(response);
      //   On successful response we will call the api for adding the user
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Test</h1>
      <button onClick={getOtp}>Submit</button>
      <div id="sendCode"></div>
      <input
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleOtp}>Verify OTP</button>
    </div>
  );
};

export default Test;
// Verify phone number on frontend and pass that data to backend to add to database
