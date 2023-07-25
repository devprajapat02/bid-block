import { useCallback, useState } from 'react'
import './App.css'

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
  
  let routes;

  if(isLoggedIn){
    routes = (
      <Routes>
        <Route path='/' Component={Home}> </Route>
        <Route path='/item/:item/desc' Component={ItemDesciption}></Route>
        <Route path='/:userid/items' Component={useritems}></Route>
        <Route path='/:userid/id' Component={Profile}></Route>
        <Route path='/:userid/listitem' Component={formx}></Route>
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
