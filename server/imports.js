const express = require("express")
const ethers = require('ethers')
const app = express()
const { abi } = require('./abi.json')
const cors = require('cors')
const fs = require('fs')

const contractAddress = '0x8c1dBbd5F1d85abD31A65F04A4c5C2E33B0E410c'
const network = "http://127.0.0.1:7545"

module.exports = {
    express,
    ethers,
    abi,
    cors,
    fs,
    contractAddress,
    network,
}