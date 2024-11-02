const joi = require('joi')

const signupValidation = (req,res,next)=>{
    const schema = joi.object({
        fullName: joi.string().min(3).max(50).required(),
        username: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required(),
        phone: joi.string().pattern(/^[0-9]{10}$/).required(),
        age: joi.number().integer().min(16).max(100).required(),
        gender: joi.string().valid('male', 'female', 'other').required(),
        dateOfBirth: joi.date().max('now').required(),
        collegeName: joi.string().min(3).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "Bad Request", error})
    }
    next()
}

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "Bad Request", error})
    }
    next()
}

module.exports = {
    signupValidation,
    loginValidation
}