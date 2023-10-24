import React, { useRef, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Login from './Login';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/Firebase"
import { useNavigate } from 'react-router-dom';
import { curYear } from '../App';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { EditContext } from '../contexts/EditContext';


const Edit = () => {
    const editFormData = useRef();
    const { loggedUser } = useContext(AuthContext);
    const { value, updateValue } = useContext(EditContext)
    const navigate = useNavigate();
    const editTaskHandler = async (e) => {
        try {
            e.prevenDefault();
            await updateDoc(doc(db, 'todo', value.id), {
                title: editFormData.current[0].value
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    const signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            setTimeout(() => {
                alert("Signed out successfully")
            }, 500)
        })
    }

    return (
        <center>
            <div>
                {!loggedUser ? (
                    <Login /> // Render Login component if loggedUser is true
                ) : (value &&
                    <section className='scollable'>
                        <div className='TodolistHeader'>
                            <h2>Welcome {loggedUser.displayName} </h2>
                            <button className='logOutbtn' onClick={signOutHandler}>
                                Logout
                            </button>
                        </div>
                        <div className='todoListAlignment'>
                            <h1>ToDo App</h1>
                            <section className='todoListOuterPage'>
                                <form className='addTodoField' onSubmit={editTaskHandler} ref={editFormData}>
                                    <input type="text" placeholder='Edit Todo' defaultValue={value.title} className='createTodoField' required />
                                    <button className='addNewTaskBtn' value="submit" type='submit'>Edit Task</button>
                                </form>
                            </section>
                        </div>
                    </section>
                )}
                <footer className="editTodoFooter">
                    Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
                </footer>
            </div>
        </center>
    )
}

export default Edit
