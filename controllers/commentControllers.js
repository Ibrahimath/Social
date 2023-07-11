const { v4: uuidv4 } = require('uuid');
const postModel = require('../models/postModel')
const userModel = require('../models/userModel')
const commentModel = require('../models/commentModel')
const {Op} = require('sequelize')

const createComment = async(req, res) => {
    try{   

       // validation
   const {user_id, comment, post_id} = req.body
  
   const findUser = await userModel.findAll({
       where: {
           user_id: user_id
           
         }  
   })
  if (findUser.length ===0){
   throw new Error('User not found')
  }   

  const findPost = await postModel.findAll({
    where: {
        post_id: post_id
        
      }  
})
if (findPost.length ===0){
throw new Error('Post not found')
}
  
  await commentModel.create({
        comment_id: uuidv4(),
        post_id: post_id,
       user_id:user_id,
       comment: comment,

  })

   res.status(200).json({
       status: true,
       message: "comment created successfully"
   })
}catch (e) {
   res.status(400).json({
       status: false,
       message: e.message

       });
}
   }

const deleteComment = async(req, res) => {
try{
    // validation
   const {comment_id, user_id, post_id} = req.body

//    const findUser = await userModel.findAll({
//        where: {
//            user_id
           
//          }  
//    })
//   if (findUser.length ===0){
//    throw new Error('User not found')
//   }

  const findComment = await commentModel.findAll({
           where: {
            [Op.and]: [{ user_id },{comment_id}, { post_id }]
           }

       })
  if (findComment.length ===0){
   throw new Error('Comment not found')
  }
   
   await commentModel.destroy({
       where: {
         [Op.and]: [{ user_id },{comment_id}]
       }
     })
     res.status(200).json({
       status: true,
       message: 'Comment deleted successfully'
     })
     return
   }catch(err){
       res.json({ 
           status: false,
           message: err.message
       })
   }
}
module.exports = {createComment, deleteComment}