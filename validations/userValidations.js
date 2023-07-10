const Joi = require('joi');

const validateCreateUser = (data) => {

  const createAccountSchema =   Joi.object({
        surname: Joi.string().required(),
        othernames: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        occupation: Joi.string(),
        about_me: Joi.string().required(),
        repeat_password: Joi.ref('password')
    
   
    })

    return createAccountSchema.validate(data);
}

const validateGetUserDetails = (data) => { 
    
    const getUserDetailsSchema = Joi.object({
    email: Joi.string().email().required()})

    return getUserDetailsSchema.validate(data);
}
module.exports = {
    validateCreateUser,
    validateGetUserDetails
};
