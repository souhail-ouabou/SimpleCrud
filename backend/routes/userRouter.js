const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/register', userCtrl.register)
// router.post('/forgot', userCtrl.forgotPassword)
// router.post('/reset', auth, userCtrl.resetPassword)
router.post('/refresh_token', userCtrl.getAccessToken)
router.get('/logout', userCtrl.logout)
// // login as normal user -> dispatch login (firstlogin true)  -> refresh_token -> dispatchlogin firstlofin false -> grtUserInfo for the nav for ex
router.get('/infor', auth, userCtrl.getUserInfor)
// // login as admin -> refresh_token -> grtAllUsersInfo
// router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)
// // login as admin -> refresh_token -> gerUserVyid
// router.get('/:id', auth, authAdmin, userCtrl.getUserDetails)
// // login as admin -> refresh_token -> update
// router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
// router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
// // login as normal user   -> refresh_token -> update
// router.put('/update', auth, userCtrl.updateUserProfile)

module.exports = router
