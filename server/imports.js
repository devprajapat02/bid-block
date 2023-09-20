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
const jwt = require('jsonwebtoken')
dotenv.config()

// const contractAddress = '0x1dcFA8c9CaE22E5C51542599eE9e1cA9a181Ba76'
// const network = "http://127.0.0.1:7545"

// const contractAddress = "0x9cb0B08E9862aA80606ab13D395236dBac1C90ea"
const contractAddress = '0x2b89fC06175DCAB4fac2f696Eda1350A67965153'
const network = "https://rpc-mumbai.maticvigil.com/"

const checkAuth = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    try {
        let cookies = {};

        if (!req.headers.cookie) {
            return res.status(401).json({error : "Authenication failed!"})
        }

        const cookiesArray = req.headers.cookie.split(';');

        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });

        req.cookies = cookies;
        
        const token = req.cookies.jwt;
        console.log(`Cookie parsed : ${token}`);
        if (!token){
            return res.status(401).json({error : "Authenication failed!"})
        }
        const decodedToken = await jwt.verify(token , process.env.SECRET_STR);
        // req.userData = {userId : decodedToken.userId};
        req.locals = {user_id: decodedToken.userId};
        next(); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({error : "Authentication failed!"})
    }
}

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
        ret.starting_time = ethers.BigNumber.from(data.starting_time).toString()
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
    checkAuth,
    auctionParser,
    cronTimer
}