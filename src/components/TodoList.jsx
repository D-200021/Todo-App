import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/Firebase"
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/Firebase';
import { TodoContext } from '../contexts/TodoContext';
import { curYear } from '../App';
import { EditContext } from '../contexts/EditContext';


const TodoList = () => {
    const { loggedUser } = useContext(AuthContext);
    const { todos } = useContext(TodoContext);
    const todotaskData = useRef();
    const [text, setText] = useState();
    const navigate = useNavigate();
    const user = loggedUser.displayName || "Guest User";
    const { value, updateValue } = useContext(EditContext)
    let currentTodos = todos.filter(todo => todo.uid === loggedUser?.uid);
    currentTodos = currentTodos.filter(todo => todo.complete === false);
    //const currentTodos = todos

    const signOutHandler = () => {
        signOut(auth).then(() => {
            navigate("/");
            setTimeout(() => {
                alert("Signed out successfully")
            }, 500)
        })
    }


    const addTodoHandler = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "todo"), {
            id: todos.length,
            title: todotaskData.current[0].value,
            uid: loggedUser.uid,
            complete: false,
            timestamp: serverTimestamp()
        }).then(() => {
            e.target.reset();
        }).catch((err) => {
            //setErr(err.message);
            console.error("Error adding document: ", err);
        })

        //setText(todotaskData.current[0].value)
    }

    const completeTaskHandler = async (e, data) => {
        try {
            e.preventDefault();
            await updateDoc(doc(db, 'todo', data.id), {
                complete: true
            });
        } catch (error) {
            alert(error.message);
        }

    }

    const deleteTaskHandler = async (e, data) => {
        try {
            e.preventDefault();
            await deleteDoc(doc(db, 'todo', data.id));
        } catch (error) {
            console.log(error.message);
        }
    }

    const editTaskHandler = (e, data) => {
        try {
            e.preventDefault();
            updateValue(data);
            navigate('/edit');
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setText("")
    }, [text])

    return (
        <center>
            <div>
                {!loggedUser ? (
                    <Login /> // Render Login component if loggedUser is true
                ) : (
                    <section className='scollable'>
                        <div className='TodolistHeader'>
                            <h2>Welcome {user} </h2>
                            <button className='logOutbtn' onClick={signOutHandler}>
                                Logout
                            </button>
                        </div>
                        <div className='todoListAlignment'>
                            <h1>ToDo App</h1>
                            <section className='todoListOuterPage'>
                                <form className='addTodoField' onSubmit={addTodoHandler} ref={todotaskData}>
                                    <input type="text" placeholder='Add todo' className='createTodoField' required />
                                    <button className='addNewTaskBtn' value="submit" type='submit'>Add New Task</button>
                                </form>
                            </section>
                            <section className='todoTaskListOuterPage'>
                                <div className='todoListTaskAligment'>
                                    <h3>ToDo List</h3>
                                    {currentTodos.length === 0 ? <p style={{ marginTop: "6vh" }}>Current ToDo List is Empty</p> : currentTodos.map((data, index) => {
                                        return (<form className='formfieldAligment' key={index}>
                                            <input type='text' value={data.title} className='taskNameField' readOnly />
                                            {/* <input type="checkbox" name="task" value={data.checked} className='checkBox' onClick={completeTaskHandler} /> */}
                                            <button className='edit' onClick={(e) => { completeTaskHandler(e, data) }}>Complete</button>
                                            <button className='edit' onClick={(e) => { editTaskHandler(e, data) }}>Edit</button>
                                            <button className='delete' onClick={(e) => { deleteTaskHandler(e, data) }}>Delete</button>
                                        </form>)
                                    })}
                                </div>
                            </section>
                        </div>
                    </section>
                )}
                <footer className="todoFooter">
                    Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
                </footer>
            </div>
        </center>
    );
}

export default TodoList
