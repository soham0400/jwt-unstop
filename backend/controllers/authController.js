const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/users");

const signup = async (req,res)=>{
    try{
        const { fullName, username, email, password, phone, age, gender, dateOfBirth, collegeName } = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            return res.status(409)
                .json({ message : "User already Exists, go to Login", success : false})
        }
        const userModel = new UserModel({
            fullName,
            username,
            email,
            password: await bcrypt.hash(password, 10),
            phone,
            age,
            gender,
            dateOfBirth,
            collegeName
        });
        await userModel.save();
        const jwtToken = jwt.sign(
            { email: userModel.email, _id: userModel._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(201)
            .json({ 
                message : "Signup was successful", 
                success : true, 
                jwtToken,
                email,
                name: userModel.username
            })
    }catch(err){
        console.log("Signup Error: ", err)
        res.status(500)
            .json({ 
                message : "internal server error", 
                success : false
            })
    }
}

const login = async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = 'Auth failed, email or password is wrong'
        if(!user){
            return res.status(403)
                .json({ 
                    message : errorMessage, 
                    success : false
                })
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual){
            return res.status(403)
                .json({ 
                    message : errorMessage, 
                    success : false
                })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id:user._id },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({ 
                message : "Login was successful", 
                success : true,
                jwtToken,
                email,
                name: user.username
            })
    }catch(err){
        res.status(500)
            .json({ message : "internal server error", success : false})
    }
}

module.exports = {
    signup,
    login
}