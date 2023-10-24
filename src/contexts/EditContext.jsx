import React, { createContext, useState } from 'react'

const EditContext = createContext();

const EditContextProvider = ({ children }) => {
    const [value, setValue] = useState([]);

    const updateValue = (newValue) => {
        setValue(newValue);
    };
    return (
        <EditContext.Provider value={{ value, updateValue }}>
            {children}
        </EditContext.Provider>
    )
}

export { EditContext, EditContextProvider };
