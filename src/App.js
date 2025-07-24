import React, { useContext } from 'react';
import { HashRouter, Router, Route, Routes } from 'react-router-dom';
import './App.css';

// ---------------- PAGES
import { RoutesContext } from './assets/context/RoutesContext';


function App() {
  
    const routesList = useContext(RoutesContext);
    
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
