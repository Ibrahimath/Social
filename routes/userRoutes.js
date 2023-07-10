const express = require('express')
const router = express.Router()
const {createUser, getUserDetails, getAllUsers} = require('../controllers/userControllers')

router.post('/register', createUser)
router.get('/details/:email', getUserDetails)
router.get('/admin/allUsers', getAllUsers)


module.exports = router