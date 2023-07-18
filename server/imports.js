const express = require("express")
const ethers = require('ethers')
const app = express()
const  abi  = require('./abi.json')
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
dotenv.config()

// const contractAddress = '0x1dcFA8c9CaE22E5C51542599eE9e1cA9a181Ba76'
// const network = "http://127.0.0.1:7545"

const contractAddress = "0x5962360fC2964A68F18ceEAD25faa5c40B6d353b"
const network = "https://rpc-mumbai.maticvigil.com/"

module.exports = {
    express,
    ethers,
    abi,
    cors,
    fs,
    mongoose,
    dotenv,
    contractAddress,
    network,
    bodyparser
    // Auction,
    // User
}