const { express, ethers, app, abi, cors, contractAddress, network} = require('../imports.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../check-auth.js') 
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
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5173');
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
        res.status(400).json({error: "There has been a error. Please try again."})
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
        const newUser = new User({
            Name: name,
            id : uuidv4(),
            email : email,
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
            '2_rupee_ki_pepsi_garvit_bhai_sexy',
            {expiresIn:"1h"}
        );
        
        res.cookie('jwt',token,{
            httpOnly: true,
            withCredentials : true,
            maxAge: 1000 * 60 * 60
        }) 
        res.cookie('userId',id,{
            httpOnly: trusted,
            withCredentials : true,
            maxAge: 1000 * 60 * 60
        }) 

        return res.status(200).json({message : "You are successfully registered!",
                        userId : id, email : email, token : token });
    } catch(error) {
        return res.status(201).json({error:"Registation is completed but login failed. Please try login again."})
    }
})

router.post('/login', validateParams, connectDB ,async (req , res, next ) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5173');
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
                '2_rupee_ki_pepis_garvit_bhai_sexy',
                {expiresIn : "1h"}
            );

            res.cookie('jwt',token,{
                httpOnly: true,
                withCredentials : true,
                maxAge: 1000 * 60 * 60
            })
            res.cookie('userId',existingUser.id,{
                httpOnly: true,
                withCredentials : true,
                maxAge: 1000 * 60 * 60
            })        
        } catch(error) {
            return res.status(400).json({error:"Login failed, please try again."})
        }
        res.status(200).json({userId : existingUser.id ,email : existingUser.email ,token : token});
    }else{
        res.status(400).json({message : "Your credentials are incorrect, please try again with correct credentials."});
    }

})

router.post('/id', checkAuth , async (req , res, next ) => {
    // still left
    res.status(200).json({user : DUMMY});
})

module.exports = router