import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch, useLocation} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import Auth from './hoc/auth'
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';

function App() {
    const location = useLocation()

    const handleRenderNav = () => {
        return location.pathname === '/login'||location.pathname ===  '/register' ? null : <NavBar/>
    }
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      { handleRenderNav() }
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
    </Suspense>
  );
}

export default App;
