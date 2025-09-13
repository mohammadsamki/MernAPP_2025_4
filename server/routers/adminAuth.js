//  userAuth.js :> to make sure that the user who use thw rowters is authenticated
//  build the middleware to check if the user is authenticated
const jwt = require('jsonwebtoken');


const adminAuth = async (req ,res,next)=>{
    const token = req.headers.auth
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        console.log('user',req.user);
        if(req.user.role === 'admin'){
        next();
        }else{
            return res.status(403).json({message:"Access denied"})
        }

        
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        
    }
}
//  export the middleware
module.exports = adminAuth;
