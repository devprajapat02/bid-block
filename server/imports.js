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

const contractAddress = "0x2e643320b6b410E9aF26388193BE78240c52880E"
const network = "https://rpc-mumbai.maticvigil.com/"

const bidParser = (data) => {
    return {
        "bid_amount" : ethers.BigNumber.from(data[0]).toString().slice(0, -15),
        "bid_time" : ethers.BigNumber.from(data[1]).toString(),
        "bidder" : data[2],
    }
}

const auctionParser = (data) => {
    try {
        let ret = {}
        ret.auction_id = data.auction_id
        ret.internal_id = ethers.BigNumber.from(data.internal_id).toString()
        ret.product_name = data.listed_product.product_name
        ret.base_price = ethers.BigNumber.from(data.listed_product.base_price).toString().slice(0, -15)
        ret.started = data.started
        ret.auction_time = ethers.BigNumber.from(data.auction_time).toString()
        ret.end_time = ethers.BigNumber.from(data.end_time).toString()
        ret.owner = data.owner
        ret.highest_bid = bidParser(data.highest_bid)
        ret.bids = data.bids.map(bidParser)
        ret.ended = data.ended
    
        return ret
    } catch (error) {
        console.log(error)
        return null
    }
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