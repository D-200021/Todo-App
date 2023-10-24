import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { curYear } from "../App";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/Firebase"

const SignUp = () => {
  const [err, setErr] = useState("");
  const registerData = useRef();
  const navigate = useNavigate();

  const signUpHandler = (e) => {
    e.preventDefault();
    const uname = registerData.current[0].value
    const email = registerData.current[1].value;
    const pass = registerData.current[2].value;
    const confPass = registerData.current[3].value;
    if (uname === "" || email === "" || pass === "" || confPass === "") {
      setErr("Please fill all fields!");
      return;
    }

    if (pass !== confPass) {
      setErr("Password and Confirmation Password don't match");
      return;
    }
    createUserHandler(auth, email, pass, uname);
  };

  const createUserHandler = (auth, email, pass, uname) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(user);
        updateProfiler(auth, uname);
        navigate('/');
      })
      .catch((error) => {
        setErr(error.code)
      });
  }

  const updateProfiler = (auth, uname) => {
    updateProfile(auth.currentUser, {
      displayName: uname,
    })
  }

  const signInPageHandler = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const avoidPasteHandler = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <center className="PageCnt">
      <section className="signUpPageOuter">
        <form
          ref={registerData}
          className={"loginPageInner"}
          onSubmit={signUpHandler}
        >
          <h1 className="loginHeader">ToDo List</h1>
          <input type="text" placeholder="userName" className="uname" required />
          <input type="email" placeholder="Email" className="email" required />
          <input
            type="password"
            placeholder="Password"
            className="password"
            onPaste={avoidPasteHandler}
            minLength="8"
            required
          />
          <input
            type="password"
            placeholder="Repeat Password"
            className="RepeatPassword"
            onPaste={avoidPasteHandler}
            minLength="8"
            required
          />
          <button type="submit" className="LoginBtb">
            Register
          </button>
          <div style={{ color: "red", fontWeight: 100, marginTop: "1vh" }}>{err}</div>
        </form>
      </section>
      <section className="loginPageOuter1">
        <h1 onClick={signInPageHandler} className="clsCreateAccountText">
          Have an account?
        </h1>
        <h1 className="clsCreateAccountText1">Log In</h1>
      </section>
      <footer className="signUpFooter">
        Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
      </footer>
    </center>
  );
};

export default SignUp;
