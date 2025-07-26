import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './App.css';
import { Spin } from 'antd';
// ---------------- context
import { RoutesContext } from './assets/context/RoutesContext';
import { ToastContainer } from 'react-toastify';


function App() {
  
    const navigate = useNavigate();
    // const { isSignedIn } = useUser();
    const isSignedIn  = undefined;
    // ---------------------------- Context ---------------------------- //
    const routesList = useContext(RoutesContext);

    // ---------------------------- Functions ---------------------------- //
    const loadPage = () => {
      if(isSignedIn === true) {
        navigate(routesList.dashboard.url);
        return;
      }
      if(isSignedIn === undefined) {
        return;
      }
      if(isSignedIn === false) {
        navigate(routesList.register.url);
        return;
      }
    }

    // ---------------------------- Effects ---------------------------- //
    useEffect(() => {
      loadPage()
    }, [isSignedIn])
    
    return (
      <>
          {
            isSignedIn === undefined
            ?
              <Spin />
            :
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
                <ToastContainer />
              </>
          }
      </>
    );
}

export default App;
