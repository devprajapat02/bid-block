import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import MainNavigation from './components/Header/MainNavigation'

function App() {

  return (
    <>
      <BrowserRouter>
      <MainNavigation />
      
      <main>
        <Routes>
          <Route path='/' Component={Home}> </Route>
        </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
