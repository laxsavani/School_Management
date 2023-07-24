const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/manager.middleware')
const {
    studentRegister,
    login,
    loginPost,
    home,
    form,
    update,
    updatePost,
    supdate,
    supdatePost,
    mail,
    deletes,
    forgot,
    conformOTP,
    conformOTPPost,
    newPassword,
    table,
    showSutdentDetail,
    fees
} = require('../controller/managercontroller')

router.post('/register',admin_token,upload.single('img'),studentRegister)

router.get('/login', login)
router.post('/login', loginPost)


router.get('/home',admin_token, home)
router.get('/form',admin_token, form)
router.get('/forgot', forgot)
router.get('/table',admin_token, table)
router.get('/showSutdentDetail/:id',admin_token, showSutdentDetail)
router.get('/conformOTP', conformOTP)
router.post('/conformOTP', conformOTPPost)
router.post('/newPassword', newPassword)
router.get('/update/:id',admin_token, update)
router.post('/update/:id',admin_token, updatePost)
router.get('/studentupdate/:id',admin_token, supdate)
router.post('/studentupdate/:id',admin_token,upload.single('img'), supdatePost)  
router.post('/mail', mail)
router.get('/delete/:id',admin_token, deletes)

router.post('/fees/:id', admin_token,fees)


module.exports = router