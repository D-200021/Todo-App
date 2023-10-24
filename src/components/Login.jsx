import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { curYear } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/Firebase'

const Login = () => {
  const [err, setErr] = useState();
  const loginData = useRef();
  const navigate = useNavigate();

  const signInHandler = (e) => {
    e.preventDefault();
    const email = loginData.current[0].value;
    const pass = loginData.current[1].value;
    if (email === "" || pass === "") {
      setErr("Please fill all fields!");
      return;
    }
    signInUserHandler(auth, email, pass);
  };

  const signInUserHandler = (auth, email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        navigate('/todo-list');
      })
      .catch((error) => {
        setErr(error.code);
      });
  }

  const createAccountHandler = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <center className="PageCnt">
      <section className={"loginPageOuter"}>
        <form
          ref={loginData}
          className={"loginPageInner"}
        //onSubmit={signInHandler}
        >
          <h1 className="loginHeader">ToDo List</h1>
          <input type="email" placeholder="Email" className="email" required />
          <input
            type="password"
            placeholder="Password"
            className="password"
            required
          />
          <button type="submit" onClick={signInHandler} className="LoginBtb" >
            Log In
          </button>
        </form>
        <div style={{ color: "red", fontWeight: 100, marginTop: "1vh" }}>{err}</div>
      </section>
      <section className="loginPageOuter1">
        <h1 onClick={createAccountHandler} className="clsCreateAccountText">
          Don't have an account?
        </h1>
        <h1 className="clsCreateAccountText1" onClick={(e) => { e.preventDefault(); navigate('/forgotPassword') }}>Forgot Password</h1>
      </section>
      <footer className="signInFooter">
        Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
      </footer>
    </center>
  );
};

export default Login;
