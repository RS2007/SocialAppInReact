const router = require('express').Router()
const authController = require('../controllers/authController')
//Register routes
router.get('/register',authController.registerGet)
router.post('/register',authController.registerPost)
router.get('/login',authController.loginGet)
router.post('/login',authController.loginPost)



module.exports = router
