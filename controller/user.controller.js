const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const config = require('config')
const userService = require('../services/user.service')
const {validateUser} = require('../validator/user.validator')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validateUser(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
     }
    const findUser = await userService.findEntry({email})
    if(!findUser){
        return res.render('signup/layout',{message:'Sign up Email does not Exist'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Email or Password Wrong'})
    }
    return res.render('user/layout')

}
const getsignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validateUser(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
     }
    const findUser = await userService.findEntry({email})
//    const findUser = await User.findOne({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exist please Login'})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const createUser = await userService.createEntry({email,password:hashedPassword})
//    const createUser = await User.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'User Created'})
    
}

module.exports = {getLoginForm,login,getsignupForm,signup}