import { createContext } from "react";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Dashboard from "../../pages/Dashboard/Dashboard";

export const RoutesContext = createContext();

const RoutesContextProvider = (props) => {

    const authRoutes = {
        login: { url: "/login", element: <Login /> },
        register: { url: "/register", element: <Register /> },
    }

    const pagesList = {
        dashboard: { url: "/", element: <Dashboard /> },
    };

    const value = {
        authRoutes,
        pagesList
    }

    return (
        <RoutesContext.Provider value={value}>
            {props.children}
        </RoutesContext.Provider>
    );
};

export default RoutesContextProvider;