import logo from './logo.svg';
import axios, * as others from 'axios';
import './App.css';
const ethers = require('ethers');
const abi = require('./abi.json');
// const axios = require('axios');

function App() {

  const network = "https://rpc-mumbai.maticvigil.com/"
  const contractAddress = "0x32e2F17ef39636432c22A2dFb41C734402D2db77"

  const fn = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner(accounts[0]);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      // const res = await fetch("http://127.0.0.1:5000", {
      //   method: "POST",
      //   mode: "cors",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      //   },
      //   body: JSON.stringify({
      //     address: accounts[0],
      //     // contract: provider,
      //   })
      // })

      const res = await axios.post("http://127.0.0.1:5000", {
        address: accounts[0],
        },{
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          }
        })

      await signer.sendTransaction({
        to: res.data.tx.to,
        data: res.data.tx.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <button onClick={fn}>Button</button>
    </div>
  );
}

export default App;
