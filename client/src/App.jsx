import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import MainNavigation from './components/Header/MainNavigation'
import ItemDesciption from './pages/ItemDesciption'
import formx from './pages/form'
import useritems from './pages/useritems'
import profile from './pages/profile'

function App() {
  const loggedIn= true
  if(loggedIn){
    return (
      <></>
    );

  }else{

  return (
    <>
      <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' Component={Home}> </Route>
          <Route path='/item/:item/desc' Component={ItemDesciption}></Route>
          <Route path='/:userid/items' Component={useritems}></Route>
          <Route path='/:userid/listitem' Component={formx}></Route>
          <Route path='/:userid/id' Component={profile}></Route>
        </Routes>
        </main>
      </BrowserRouter>
    </>
  );
  }
}

export default App
