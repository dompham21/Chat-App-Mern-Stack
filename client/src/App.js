import React, { Suspense, useEffect } from 'react';
import './App.css';
import {Switch, useLocation} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Page404 from './components/Page404/Page404';
import socket from './socket';
const token = localStorage.getItem('token')
function App() {
    const location = useLocation()

    // const handleRenderNav = () => {
    //     return location.pathname === '/login'||location.pathname ===  '/register' ? null : <NavBar/>
    // }
  
    // useEffect(() => {
    //   if(token){
    //     socket();
    //   } 
    // }, [token])
    
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      {/* { handleRenderNav() } */}
        <Switch>
          <NavBar/>
          <PublicRouter restricted={true} component={Login} path="/login" exact/>
          <PublicRouter restricted={true} component={Register} path="/register" exact/>
          {/* <PrivateRouter exact path="/" component={LandingPage}/> */}
          <PublicRouter restricted={false} component={Page404} path="*" exact/>
        </Switch>
    </Suspense>
  );
}

export default App;
