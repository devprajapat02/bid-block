const express = require("express")
const ethers = require('ethers')
const app = express()
const  abi  = require('./abi.json')
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const crypto = require('crypto-js')
const cron = require('node-cron')
dotenv.config()

// const contractAddress = '0x1dcFA8c9CaE22E5C51542599eE9e1cA9a181Ba76'
// const network = "http://127.0.0.1:7545"

const contractAddress = "0x617cB8C2F929962231bF63A98B4575a2d13C1A7A"
const network = "https://rpc-mumbai.maticvigil.com/"

const bidParser = (data) => {
    return {
        "bid_amount" : ethers.BigNumber.from(data[0]).toString().slice(0, -15),
        "bid_time" : ethers.BigNumber.from(data[1]).toString(),
        "bidder" : data[2],
    }
}

const auctionParser = (data) => {
    let ret = {}
    ret.auction_id = data[0]
    ret.internal_id = ethers.BigNumber.from(data[1]).toString()
    ret.product_name = data[2][0]
    ret.base_price = ethers.BigNumber.from(data[2][1]).toString().slice(0, -15)
    ret.started = data[3]
    ret.auction_time = ethers.BigNumber.from(data[4]).toString()
    ret.end_time = ethers.BigNumber.from(data[5]).toString()
    ret.owner = data[6]
    ret.highest_bid = bidParser(data[7])
    ret.bids = data[8].map(bidParser)
    ret.ended = data[9]

    return ret
}

const cronTimer = (time) => {
    const ob = new Date(time)
    return `${ob.getMinutes()} ${ob.getHours()} ${ob.getDate()} ${ob.getMonth()+1} *`
}

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
    bodyparser,
    crypto,
    cron,
    auctionParser,
    cronTimer
}