import { useCallback, useState } from 'react'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
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
  
  return (
    <AuthContext.Provider value = {{isLoggedIn : isLoggedIn, login : login, logout : logout}}>
      <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' Component={Home}> </Route>
          <Route path='/auth' Component={Authentication}></Route>
          <Route path='/item/:item' Component={ItemDesciption}></Route>
          <Route path='/:userid/items' Component={useritems}></Route>
          <Route path='/:userid/id' Component={Profile}></Route>
          <Route path='/listitem' Component={formx}></Route>
        </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
