import { useCallback, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import { ethers } from 'ethers'


import { Loader } from '@mantine/core'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
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
  const [checkWait, setCheckWait] = useState(true);

  const login = useCallback(() => {
    setIsloggedIn(true);
  },[])

  const logout = useCallback(() => {
    setIsloggedIn(false);
  },[])

  const checkState = async () => {
    try{
      const res = await axios.post('https://bid-block-server.onrender.com/userData/verify', {}, {withCredentials:true});
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
    setCheckWait(false);
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
        <Route path="*" element={<WaitLoader checkWait={checkWait} />} ></Route>
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

      {/*
        Temporary code for development purposes
      

      <div>
        <h3>Dev mode</h3>
        <button onClick={() => {
          const fn = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const res = await axios.post('https://bid-block-server.onrender.com/emergencyWithdraw', {address: accounts[0]})

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner(accounts[0])
            const tx = await signer.sendTransaction(res.data.tx)
            await tx.wait()
            console.log('tokens withdrawn')
          }

          fn()
        }}>Empty Contract Balance</button>
      </div>

      
        Temporary code for development purposes
      */}


      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
      
    </AuthContext.Provider>
  );
}

const Redirect= props => {
  console.log("Route Not found ! Redirected to home")
  return (<Navigate to="/" replace />);
}

const WaitLoader = props => {
  return (<>
          {props.checkWait && <div className="place-list center" style={{background: "#4d4d4d",marginTop:"40px"}}>
            <Loader variant="bars" color="white" sz="xl" />
          </div>}
    {!props.checkWait && <Navigate to="/auth" replace />}
    </>
        );
}
export default App
