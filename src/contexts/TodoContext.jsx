import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/Firebase";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const doSomething = () => {
        const q = query(collection(db, "todo"), orderBy("timestamp", "desc"))
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
        })
    }
    useEffect(() => {
        doSomething();
    }, []);

    return (
        <TodoContext.Provider value={{ todos }}>
            {children}
        </TodoContext.Provider>
    );
}