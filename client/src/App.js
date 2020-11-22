import React, { Suspense } from 'react';
import './App.css';
import {Switch, useLocation} from "react-router-dom";
import Register from './components/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Page404 from './components/Page404/Page404';
import Message from './components/Message/Message';
function App() {
    const location = useLocation()


    const handleRenderNav = () => {
        return location.pathname === '/login'||location.pathname ===  '/register' ? null : <NavBar/>
    }
  
    
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      { handleRenderNav() }
        <Switch>
          <PublicRouter restricted={true} component={Login} path="/login" exact/>
          <PublicRouter restricted={true} component={Register} path="/register" exact/>
          <PrivateRouter exact path="/" component={Message}/>
          <PrivateRouter  component={Page404} path="*" exact/>
        </Switch>
    </Suspense>
  );
}

export default App;
