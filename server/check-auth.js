const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer token'
        if (!token){
            return res.status(400).json({error : "Authenication failed!"})
        }
        const decodedToken = jwt.verify(token , '2_rupee_ki_pepsi_garvit_bhai_sexy');
        req.userData = {userId : decodedToken.userId};
        next();
    } catch (error) {
        return res.status(400).json({error : "Authentication failed!"})
    }
}