import { createContext } from "react";
import Login from "../../pages/Login";
import Register from "../../pages/Register/Register";
import Dashboard from "../../pages/Dashboard";

export const RoutesContext = createContext();

const RoutesContextProvider = (props) => {
    const routesList = {
        dashboard: { url: "/", element: <Dashboard /> },
        login: { url: "/login", element: <Login /> },
        register: { url: "/register", element: <Register /> },
    };

    return (
        <RoutesContext.Provider value={routesList}>
            {props.children}
        </RoutesContext.Provider>
    );
};

export default RoutesContextProvider;