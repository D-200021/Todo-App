import React, { useRef, useState } from 'react'
import { curYear } from '../App';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase/Firebase"


const ForgotPassword = () => {
    const forgotPass = useRef();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const forgotPasswordHandler = async (e) => {
        try {
            e.preventDefault();
            await sendPasswordResetEmail(auth, forgotPass.current[0].value)
                .then(() => {
                    setMessage('Password reset email sent. Please check your inbox.');
                    navigate("/")
                })
                .catch(error => {
                    setMessage(`Error: ${error.message}`);
                });
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <center className="PageCnt">
            <section className={"loginPageOuter"}>
                <form
                    ref={forgotPass}
                    className={"loginPageInner"}
                    onSubmit={forgotPasswordHandler}
                >
                    <h1 className="loginHeader">ToDo List</h1>
                    <input type="email" placeholder="Email" className="email" required />
                    <button type="submit" className="LoginBtb">
                        Submit
                    </button>
                </form>
                <div>{message}</div>
            </section>
            <footer className="forgotPasswordFooter">
                Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
            </footer>
        </center>
    )
}

export default ForgotPassword
