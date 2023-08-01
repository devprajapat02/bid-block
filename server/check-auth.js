const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5173');
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
        req.userData = {userId : decodedToken.userId};
        next(); 
    } catch (error) {
        return res.status(400).json({error : "Authentication failed!"})
    }
}