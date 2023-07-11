const express = require('express')
const router = express.Router()
const {createComment, deleteComment} = require('../controllers/commentControllers')

router.post('/create', createComment)
router.delete('/delete', deleteComment)




module.exports = router