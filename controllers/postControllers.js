const { v4: uuidv4 } = require('uuid');

const createPost = async(req, res) => {
     try{   
    const {user_id, post} = req.body
    if (!post || post.length < 30 ) {
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
   
   await userModel.create({
        post_id: uuidv4(),
        user_id:user_id,
        post: post,

   })

    res.status(200).json({
        status: true,
        message: "post created successfully"
    })
}catch (e) {
    console.log("error creating post");
}
    }

module.exports = {createPost}