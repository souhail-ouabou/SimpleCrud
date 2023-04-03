const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/login', userCtrl.login)
router.post('/register', userCtrl.register)
router.post('/refresh_token', userCtrl.getAccessToken)
router.get('/logout', userCtrl.logout)
router.get('/infor', auth, userCtrl.getUserInfor)

module.exports = router
