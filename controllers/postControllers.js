const { v4: uuidv4 } = require('uuid');
const postModel = require('../models/postModel')
const userModel = require('../models/userModel')
const {Op} = require('sequelize')
const createPost = async(req, res) => {
     try{   
    const {user_id, post} = req.body
    console.log(user_id, post)
    if (!post ) {
        throw new Error('Invalid post')
}
    const findUser = await userModel.findAll({
        where: {
            user_id: user_id
            
          }  
    })
   if (findUser.length ===0){
    throw new Error('User not found')
   }   
   
   await postModel.create({
         id: uuidv4(),
        post_id: uuidv4(),
        user_id:user_id,
        post: post,

   })

    res.status(200).json({
        status: true,
        message: "post created successfully"
    })
}catch (e) {
    res.status(400).json({
        status: true,
        message: e.message

        });
}
    }

const deletePost = async(req, res) => {
try{

    const {post_id, user_id} = req.body

    const findUser = await userModel.findAll({
        where: {
            user_id
            
          }  
    })
   if (findUser.length ===0){
    throw new Error('User not found')
   }

   const findPost = await postModel.findAll({
            where: {
                post_id
            }

        })
   if (findPost.length ===0){
    throw new Error('Post not found')
   }
    
    await postModel.destroy({
        where: {
          [Op.and]: [{ user_id }, { post_id }]
        },
      })
      res.status(200).json({
        status: true,
        message: 'post deleted successfully'
      })
      return
    }catch(err){
        res.json({ 
            status: false,
            message: err.message
        })
    }
}
module.exports = {createPost, deletePost}