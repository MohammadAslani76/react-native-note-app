import React,{createContext, useState} from "react";
export const DataContext = createContext();

export const DataProvider = (props) => {

    const [notes,setNotes] = useState([])

    const value = {
        notes : [notes,setNotes]
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}