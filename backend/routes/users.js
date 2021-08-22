const router = require('express').Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const userController = require('../controllers/userController')
//get a user
router.get('/:id',userController.userGet)
//update a user
router.put('/update/:id',userController.userUpdate)
//delete a user
router.delete('/delete/:id',userController.userDelete)
//follow user
router.put('/follow/:id',userController.userFollows)
//unfollow user
router.put('/unfollow/:id',userController.userUnfollow)

module.exports = router
