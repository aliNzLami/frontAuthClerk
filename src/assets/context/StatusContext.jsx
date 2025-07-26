import { createContext, useState } from "react";

export const StatusContext = createContext();

const StatusContextProvider = (props) => {
    
    const [status, setStatus] = useState(null);

    const prepareStatus = () => {
        const existedStatus = JSON.parse(localStorage.getItem("status"));
        existedStatus ? updateStatus(existedStatus) : updateStatus({});
    }

    const updateStatus = (newStatus) => {
        localStorage.setItem("status", JSON.stringify(newStatus));
        setStatus({...newStatus});
    }

    const value = {
        status,
        prepareStatus,
        updateStatus
    }

    return (
        <StatusContext.Provider value={value}>
            {props.children}
        </StatusContext.Provider>
    );
};

export default StatusContextProvider;