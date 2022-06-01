const Joi = require('joi')

const validateUser = fields => {
    const userValidateSchema = Joi.object({
        email : Joi.string().min(5).max(52).required(),
        password:Joi.string().min(8).max(16).required()
    })
    const {error,value} = userValidateSchema.validate(fields)
    return {error,value}
}

module.exports = {validateUser}