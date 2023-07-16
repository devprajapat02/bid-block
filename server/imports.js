const express = require("express")
const ethers = require('ethers')
const app = express()
const { abi } = require('./abi.json')
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const contractAddress = '0x1dcFA8c9CaE22E5C51542599eE9e1cA9a181Ba76'
const network = "http://127.0.0.1:7545"

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
    // Auction,
    // User
}