const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/admin.middleware')
const {
    home,
    formElenents,
    tableGeneral,
    profile,
    login,
    faq,
    managerRegister,
    loginPost,
    updateAdmin,
    updateManager,
    updatePostAdmin,
    updatePostManager,
    mail,
    // register
} = require('../controller/admincontroller')

router.post('/register', managerRegister)
router.get('/login', login)
router.post('/login', loginPost)


router.get('/home',admin_token, home)
router.get('/formElenents',admin_token, formElenents)
router.get('/tableGeneral',admin_token, tableGeneral)
router.get('/profile',admin_token, profile)
router.get('/faq',admin_token, faq)
router.get('/updateAdmin/:id',admin_token, updateAdmin)
router.get('/updateManager/:id',admin_token, updateManager)
router.post('/updateAdmin/:id',admin_token,upload.single('img'), updatePostAdmin)
router.post('/updateManager/:id',admin_token,upload.single('img'), updatePostManager)
router.get('/mail/:id',admin_token, mail)
router.get('/logout',(req,res)=>{
    res.cookie("jwt","");
    res.clearCookie();
    res.redirect('/admin/login');
})


module.exports = router