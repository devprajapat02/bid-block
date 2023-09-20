const { express, ethers, app, abi, cors, checkAuth, contractAddress, network} = require('../imports.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const checkAuth = require('../check-auth.js') 
const cookieParser = require('cookie-parser')
const Auction = require('../database/auctionSchema.js')
const { connectDB } = require('../database/connect.js');
const { trusted } = require('mongoose');
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const DUMMY = {
    name : "Devansh Agrawal",
    email : "dev@gmail.com",
    password : "devansh"
}

let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const validateParams = (req, res, next) => {

    if (!req.body.email) res.status(400).json({error: "Missing parameter - Email"})

    else if (!req.body.password) res.status(400).json({error: "Missing parameter - password"})
    
    else next()
}

router.post('/signup', validateParams ,connectDB, async (req , res, next ) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    if(!req.body.name) {
        res.status(400).json({error: "Missing Parameter - Name"})
        return ;
    }

    const {name, email, password} = req.body;

    // Validating input
    if(password.toString().length < 7){
        return res.status(400).json({error: "Password length must be atleast 7."});
    }else if(!emailRegex.test(email.toString())){
        return res.status(400).json({error: "Not a valid email."});
    }else if( !name.toString().length > 0){
        return res.status(400).json({error: "Name must not be empty"});
    }

    //Check if the user already exists
    let existingUser;
    try {
        const User = require('../database/userSchema.js')
        existingUser = await User.findOne({email:email});
    } catch(error){
        console.log(error)
        res.status(400).json({error: "There has been an error. Please try again."})
    }

    if(existingUser){
        return res.status(400).json({error:"This email Id is used by another user, please register with a different email."});
    }

    //creating Hashed password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password,12);
    } catch (err) {
        return res.status(500).json({error: "Could not create user please try again."})
    }

    //Storing the new user
    let id;
    try {
        const User = require("../database/userSchema.js")
        // const Address = require("../database/userSchema.js")
        // const newAddress = new Address()
        console.log(req.body)
        const newUser = new User({
            Name: name,
            id : uuidv4(),
            email : email,
            profileImage: req.body.image,
            address : {
                local : req.body.address,
                pincode : req.body.pinCode,
                country : req.body.country,
                state : req.body.state,
                city : req.body.city
            }, 
            passwordHash : hashedPassword,
        });
        
        id = newUser.id;
        await newUser.save()
        
    } catch (error){
        console.log(error)
        res.status(400).json({error: "Unable to create user in database, please try again."})
    }


    //Creating token for signup after registering
    let token;
    try{
        token = jwt.sign(
            {userId : id ,email : email},
            process.env.SECRET_STR,
            {expiresIn:"24h"}
        );
        
        res.cookie('jwt',token,{
            httpOnly: true,
            withCredentials : true,
            maxAge: 24000 * 60 * 60
        }) 
        res.cookie('userId',id,{
            httpOnly: trusted,
            withCredentials : true,
            maxAge: 24000 * 60 * 60
        }) 

        return res.status(200).json({message : "You are successfully registered!",
                        userId : id, email : email, token : token });
    } catch(error) {
        return res.status(201).json({error:"Registation is completed but login failed. Please try login again."})
    }
})

router.post('/login', validateParams, connectDB ,async (req , res, next ) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    const {email,password} = req.body;

    // validate input
    if(password.toString().length < 7){
        res.status(400).json({error: "Password length must be atlesat 7."})
        return ;
    }else if(!emailRegex.test(email.toString())){
        res.status(400).json({error: "Not a valid email."})
        return ;
    }

    // Check if the user exists in db
    let existingUser;
    try {
        const User = require('../database/userSchema.js')
        existingUser = await User.findOne({email:email});
    } catch(error){
        console.log(error)
        res.status(400).json({error: "Unable to check user credentials, please try again."})
    }

    if(!existingUser){
        res.status(400).json({error:"No such user exists!"})
    }

    //Compare Password
    let isValidpassword = false;
    try {   
        isValidpassword = await bcrypt.compare(password,existingUser.passwordHash)
    } catch (error){
        console.log(error)
        res.status(400).json({error: "Could not login, please check your credentials and try again."})
    }

    if(isValidpassword){
        //creating token for signup
        let token;
        try{
            token = jwt.sign(
                {userId : existingUser.id, email : existingUser.email},
                process.env.SECRET_STR,
                {expiresIn : "24h"}
            );

            res.cookie('jwt',token,{
                httpOnly: true,
                withCredentials : true,
                maxAge: 24000 * 60 * 60
            })
            res.cookie('userId',existingUser.id,{
                httpOnly: true,
                withCredentials : true,
                maxAge: 24000 * 60 * 60
            })        
        } catch(error) {
            return res.status(400).json({error:"Login failed, please try again."})
        }
        res.status(200).json({userId : existingUser.id ,email : existingUser.email ,token : token, message: "Login Successful"});
    }else{
        res.status(400).json({error : "Your credentials are incorrect, please try again with correct credentials."});
    }

})

router.post('/id', checkAuth , connectDB , async (req , res, next ) => {
    const id = req.locals.user_id;
    console.log("userId :" + id);
    try {
        const User = require('../database/userSchema.js')
        const existingUser = await User.findOne({id:id});
        console.log(existingUser)
        return res.status(200).json({user : existingUser})
    } catch(err){
        return res.status(400).json({message : "Error in fetching user data , please try again!"})
    }
})

router.post('/logout', checkAuth, async (req , res, next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    try {
        console.log(req.cookies)
        res.clearCookie("jwt");
        res.clearCookie("userId");
        res.status(200).json({message : "Successfully logged out!"});
    } catch (err) {
        res.status(400).json({message : "Error in logging out."});
    }
})

router.post('/verify', async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    try {
        let cookies = {};
        if (!req.headers.cookie) {
            return res.status(201).json({message : "Not logged In! No cookie present"})
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
            return res.status(201).json({message : "Not logged In! No token present"})
        }
        const decodedToken = await jwt.verify(token , process.env.SECRET_STR);
        return res.status(200).json({message : "Logged In!"})
    } catch (error) {
        return res.status(201).json({message : "Not logged In!"})
    }
})

router.post('/getItems', checkAuth, async (req , res, next) => {
    const id = req.cookies.userId;
    console.log("userId :" + id);
    try {
        const User = require('../database/userSchema.js')
        const Auction = require('../database/auctionSchema.js')
        const existingUser = await User.findOne({id:id});
        const auctionList = await Auction.find({ auction_id: { $in: existingUser.auctions } })
        console.log(auctionList);
        return res.status(200).json({auctionList})
    } catch (err) {
        res.status(400).json({message : "Unable to fetch User Items , please try reloading the page"});
    }
})

module.exports = router