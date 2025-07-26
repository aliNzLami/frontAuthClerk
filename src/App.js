import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';
import './App.css';
import { Spin } from 'antd';
// ---------------- context
import { RoutesContext } from './assets/context/RoutesContext';
import { ToastContainer } from 'react-toastify';


// ---------------- context
import { RoutesContext } from './assets/context/RoutesContext';
import { ToastContainer } from 'react-toastify';


function App() {
  
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    // ---------------------------- Context ---------------------------- //
    const { authRoutes, pagesList } = useContext(RoutesContext) || {};

    // ---------------------------- Functions ---------------------------- //
    const loadPage = () => {
      if(isSignedIn === true) {
        navigate(pagesList.dashboard.url);
        return;
      }
      if(isSignedIn === undefined) {
        return;
      }
      if(isSignedIn === false) {
        navigate(authRoutes.register.url);
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
                isSignedIn === true
                ?
                  <>
                      <Routes>
                        {
                          pagesList
                          &&
                          Object.entries(pagesList).map( (route) => {
                            return (
                              <Route key={route[0]} path={route[1].url} element={route[1].element} />
                            )
                          })
                        }
                    </Routes>
                  </>
                :
                  <>
                    <Routes>
                        {
                          authRoutes
                          &&
                          Object.entries(authRoutes).map( (route) => {
                            return (
                              <Route key={route[0]} path={route[1].url} element={route[1].element} />
                            )
                          })
                        }
                    </Routes>
                  </>
          }
          <ToastContainer />
      </>
    );
}

export default App;
