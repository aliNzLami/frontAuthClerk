import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

// ---------------- context
import { RoutesContext } from './assets/context/RoutesContext';
import { StatusContext } from './assets/context/StatusContext';


function App() {
  
    const navigate = useNavigate();

    // ---------------------------- Context ---------------------------- //
    const routesList = useContext(RoutesContext);
    const { status, prepareStatus } = useContext(StatusContext);


    // ---------------------------- Functions ---------------------------- //
    const loadPage = () => {
      if(status === null) {
        // loading
      }
      else {
        Object.keys(status).length ? navigate(routesList.dashboard.url) : navigate(routesList.register.url)
      }
    }

    // ---------------------------- Effects ---------------------------- //
    useEffect(() => {
      prepareStatus();
    }, [])

    useEffect(() => {
      loadPage()
    }, [status])
    
    return (
      <>
          <Routes>
            {
              routesList
              &&
              Object.entries(routesList).map( (route) => {
                return (
                  <Route key={route[0]} path={route[1].url} element={route[1].element} />
                )
              })
            }
          </Routes>
      </>
    );
}

export default App;
