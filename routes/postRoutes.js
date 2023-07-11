const express = require('express')
const router = express.Router()
const {createPost, deletePost} = require('../controllers/postControllers')

router.post('/create', createPost)
router.delete('/delete', deletePost)




module.exports = router