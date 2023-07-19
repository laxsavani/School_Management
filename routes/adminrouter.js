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
    registerPost,
    loginPost,
    update,
    updatePost,
    deletes,
    mail,
    // register
} = require('../controller/admincontroller')

// router.get('/register', register)
router.post('/register', registerPost)
router.get('/login', login)
router.post('/login', loginPost)


router.get('/',admin_token, home)
router.get('/formElenents',admin_token, formElenents)
router.get('/tableGeneral',admin_token, tableGeneral)
router.get('/profile',admin_token, profile)
router.get('/faq',admin_token, faq)
router.get('/update/:id',admin_token, update)
router.post('/update/:id',admin_token,upload.single('img'), updatePost)
router.get('/delete/:id',admin_token, deletes)
router.get('/mail/:id',admin_token, mail)
router.get('/logout',(req,res)=>{
    res.cookie("jwt","");
    res.clearCookie();
    res.redirect('/admin/');
})


module.exports = router