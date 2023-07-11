const bcrypt = require('bcrypt');
const hashPassword = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const {validateCreateUser, validateGetUserDetails} = require('../validations/userValidations')
const userModel =  require('../models/userModel')




const createUser = async (req, res) => {
    const { error } = validateCreateUser(req.body)
    if (error !== undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message || "Bad request"
        })
        return
    }
        const {surname,othernames,username, email,occupation,
            about_me,password } = req.body
        const checkIfUserExist = await userModel.findAll({
                                     attributes: ['email'],
                                     where:
                                             { email: email }
        });

        if(checkIfUserExist.length > 0) {
            res.status(400).json({
                status: false,
                message: "user already exists"
            })
            return
        }
        const checkIfUsernameUsed = await userModel.findAll({
            attributes: ['username'],
            where: 
                
                    { username}
                            
});
    if(checkIfUsernameUsed.length > 0) {
    res.status(400).json({
        status: false,
        message: "username already used, pick another"
    })
    return
}

        const { hash, salt } = await hashPassword(password)
        const userID = uuidv4()
        await userModel.create({
            user_id: userID,
            surname: surname,
            othernames: othernames,
            username: username,
            about_me: about_me,
            occupation: occupation,
            email: email,
            password_hash: hash,
            password_salt : salt
            

        })

        res.status(200).json({
            status: true,
            message: "account created successfully"
        })
    }

const getUserDetails = async(req, res) =>{
    try{
    const { error } = validateGetUserDetails(req.params)
    if (error !== undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message || "Bad request"
        })
        return
    }
    const email = req.params.email
    const findDetails = await userModel.findAll({
        attributes: ['surname','othernames','username','email', 'occupation', 'about_me'],
        where:
                { email }
    });
    if(findDetails.length === 0){
        throw new Error ("user not found",400)
    }

    res.status(200).json({
        status: true,
        data: findDetails
    })
    return
}catch(e){console.log("AAAAAAAAA", e);}
}

const updateUser = async(req, res) => {
    // validation
try {
const {user_id, email} = req.header;
const findUser = await userModel.findAll({
    where: {
        [Op.and]: [{ user_id }, {email}]
    }

})
if (findUser.length ===0){
throw new Error('User not found')
}


}catch (e){}
}



const getAllUsers = async(req, res) =>{
    const findAllUsers = await userModel.findAll({
        attributes: ['surname','othernames','username','email', 'occupaton', 'about_me']});

        res.status(200).json({
        status: true,
        data: findAllUsers
    })
}

    module.exports = {createUser, getUserDetails,getAllUsers}