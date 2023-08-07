import { useCallback, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import {BrowserRouter,Routes,Route,Navigate, useNavigate} from 'react-router-dom'
import Home from './pages/home'
import MainNavigation from './components/Header/MainNavigation'
import ItemDesciption from './pages/ItemDesciption'

import formx from './pages/form'
import useritems from './pages/useritems'
import { AuthContext } from './context/AuthContext'
import Authentication from './pages/Authentication'
import Profile from './pages/Profile'

function App() {
  const [isLoggedIn,setIsloggedIn] = useState(false);

  const login = useCallback(() => {
    setIsloggedIn(true);
  },[])

  const logout = useCallback(() => {
    setIsloggedIn(false);
  },[])

  const checkState = async () => {
    try{
      const res = await axios.post('http://localhost:5000/userData/verify', {}, {withCredentials:true});
      console.log(res);
      if(res.status === 200 ){
          console.log("State restored")
          login();
      }else{
        console.log(res.data.message);
      }

    } catch(err){
       console.log("Problem in checking logging state , please try again.", err)
    }
  }
  
  useEffect(() => {
    checkState();
  }, []);
  
  let routes;

  if(isLoggedIn){
    routes = (
      <Routes>
        <Route path='/' Component={Home}> </Route>
        <Route path='/item/:item' Component={ItemDesciption}></Route>
        <Route path='/:userid/items' Component={useritems}></Route>
        <Route path='/:userid/id' Component={Profile}></Route>
        <Route path='/listitem' Component={formx}></Route>
        <Route path="*" Component={Redirect} ></Route>
      </Routes>
    )
  }else{
    routes = (
      <Routes>
        <Route path='/' Component={Home}> </Route>
        <Route path='/auth' Component={Authentication}></Route>
        <Route path="*" Component={Redirect}></Route>
      </Routes>
    )
  }

  return (
    <AuthContext.Provider value = {{isLoggedIn : isLoggedIn, login : login, logout : logout}}>
      <BrowserRouter>
      <MainNavigation />
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

const Redirect= props => {
  console.log(1);
  return (<Navigate to="/" replace />);
}

export default App
