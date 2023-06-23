import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import MainNavigation from './components/Header/MainNavigation'
import ItemDesciption from './pages/ItemDesciption'
import formpage from './pages/formpage'
import formx from './components/AuctionForm/form'

function App() {

  return (
    <>
      <BrowserRouter>
      <MainNavigation />

      <main>
        <Routes>
          <Route path='/' Component={Home}> </Route>
          <Route path='/item/:item/desc' Component={ItemDesciption}></Route>
          <Route path='/:userid/listitem' Component={formx}></Route>
        </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
