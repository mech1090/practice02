const User = require('../model/user.model')

const findEntry = async(field) =>{
    const findUser = User.findOne(field)
    return findUser
}

const createEntry = async(fields)=>{
    const createUser = User.create(fields)
    return createEntry
}

module.exports = {findEntry,createEntry}