//  import userControoler 
const express = require('express');
const {updateProfile,checkUSerRole,loginUser, profile,createUser,getAllUsers,deleteUSerById,updateByID,editPassword } = require('../controllers/userController');
const router = express.Router();
//  import userAuth middleware
const userAuth = require('./userAuth');
const adminAuth = require('./adminAuth');

//  crete user route 
router.post('/create', createUser);
router.post('/adminCreate', adminAuth,createUser);
router.get('/allUsers',adminAuth,getAllUsers);
router.delete('/delete/:id',adminAuth,deleteUSerById)
router.put('/update',userAuth ,updateProfile)
// updateByID
router.put('/updateById/:id',adminAuth,updateByID)
//  login route
router.post('/login', loginUser);
router.put('/editPassword',userAuth,editPassword)

//  profile route
router.get('/profile', userAuth, profile);
router.get('/checkRole',userAuth,checkUSerRole)

//  export the router
module.exports = router;