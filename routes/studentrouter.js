const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/student.middeleare')
const {
    login,
    loginPost,
    home,
    changePassword,
    changePasswordPost
} = require('../controller/studentcontroller')

router.get('/login', login)
router.post('/login', loginPost)
router.get('/home',admin_token, home)
router.get('/changePassword',admin_token, changePassword)
router.post('/changePassword',admin_token, changePasswordPost)

router.get('/logout',(req,res)=>{
    res.cookie("jwt","");
    res.clearCookie();
    res.redirect('/student/login');
})

module.exports = router