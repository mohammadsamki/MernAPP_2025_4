//  import USer model
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//  Register new user

const createUser = async (req, res)=>{
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    console.log(role);

    try {
        //  encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = new User({
            username:userName,
            email:email,
            password:hashedPassword,
            role:role
        })
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
        
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: error.message });
        
    }
}
//  login 
const loginUser = async (req,res)=>{
    const { email, password } = req.body;
    try {
        //  decrypt the password
    
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if (!isMatched){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        if (user){
        const token = jwt.sign({id :user._id, role: user.role},process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', user, token });

        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: error.message });
        
    }
}
//  get all users 

const getAllUsers = async (req,res)=>{
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)

    } catch (error) {
                res.status(500).json({ message: error });

        
    }
}
//  delete user :> id 
const deleteUSerById = async (req,res)=>{
    const {id} = req.params

    try {
        const userToDelete = await User.findByIdAndDelete(id)
        // const userToUpdate = await User.findByIdAndUpdate(id,{username:})
                res.status(200).json({message:"user deleted",user:userToDelete})
        
    } catch (error) {
        res.status(500).json({ message: error });

    }
}
// update 
const updateProfile = async (req,res)=>{
    const id = req.user.id
    const { username,email} = req.body
    try {
        const userToUpdate = await User.findByIdAndUpdate(id,{username,email})
        res.status(200).json({message:"user Updated done",user:userToUpdate})
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
}
//  export the createUser function
const profile = async (req,res)=>{
    const id = req.user.id
    console.log(id);
    try {
            const userProfile = await User.findById(id)
        res.status(200).json(userProfile)
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
}
const editPassword = async (req,res)=>{
    const id = req.user.id
    const { oldPassword, newPassword } = req.body;
    try {
        var user = await User.findById(id)
        const isMatched = await bcrypt.compare(oldPassword,user.password)
        if (!isMatched){
            return res.status(401).json({ message: 'Old password is incorrect' });
        }
        //  encrypt the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });

        
    }
}
// check user role
const checkUSerRole =async (req,res)=>{
const userid = req.user.id
try {
    const user = await User.findById(userid)
    if(user.role !== 'admin'){
        return res.status(403).json({message:"Access denied"})
    }
    res.status(200).json({message:"Access granted"})
    
} catch (error) {
    res.status(500).json({ message: error.message });
    
}
}
//  updateByID 
const updateByID = async (req,res)=>{
    const id = req.params.id
    const { username,email,role} = req.body
    try {
        const userToUpdate = await User.findByIdAndUpdate(id,{username,email,role})
        res.status(200).json({message:"user Updated done",user:userToUpdate})
    } catch (error) {
    res.status(500).json({ message: error.message });

        
    }
}
module.exports = {updateProfile,checkUSerRole, createUser,getAllUsers,deleteUSerById,updateByID,profile,loginUser,editPassword };